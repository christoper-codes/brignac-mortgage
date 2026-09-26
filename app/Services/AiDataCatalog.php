<?php

namespace App\Services;

use App\Enums\LeadStatus;
use App\Models\Campaign;
use App\Models\Lead;
use Illuminate\Database\Eloquent\Builder;

/**
 * The menu of website data the AI assistant can ask for. The assistant first sees only this list
 * (id + description), picks what it needs, and only then do we load those pieces — so a question
 * about campaigns never pays the token cost of browsers, pages, geography, and so on.
 */
class AiDataCatalog
{
    /** @var array<string, mixed>|null */
    private ?array $analytics = null;

    public function __construct(private DashboardStats $stats) {}

    /**
     * @return array<string, array{label: string, description: string}>
     */
    public function options(): array
    {
        return [
            'overview' => ['label' => 'Overview', 'description' => 'Headline numbers for the period: unique visitors, page views, CTA clicks, leads, conversion rate, and % change vs the previous period.'],
            'daily_trend' => ['label' => 'Daily trend', 'description' => 'Day-by-day visitors, page views, CTA clicks and leads for the period.'],
            'long_term_trend' => ['label' => 'Weekly & monthly trend', 'description' => 'Visitors and leads per week (last 12 weeks) and per month (last 12 months).'],
            'campaigns' => ['label' => 'Campaigns', 'description' => 'Each ad campaign: platform, status, budget, visits, CTA clicks, leads, conversion %, and cost per lead.'],
            'traffic_sources' => ['label' => 'Traffic sources', 'description' => 'Where visitors come from (UTM source such as facebook/tiktok, referring sites, or Direct).'],
            'cta_clicks' => ['label' => 'CTA clicks', 'description' => 'Which call-to-action buttons/links are clicked most (Get Pre-Qualified, Apply Now, Call, Email...).'],
            'apply_now_by_team_member' => ['label' => 'Apply Now by team member', 'description' => 'Per team member: Apply Now clicks and phone/email clicks — who visitors prefer.'],
            'top_pages' => ['label' => 'Top pages', 'description' => 'Most visited pages (paths) on the website.'],
            'devices_browsers_os' => ['label' => 'Devices, browsers & OS', 'description' => 'Visitors by device type, browser and operating system.'],
            'lead_conversion_by_agent' => ['label' => 'Which browsers/devices convert', 'description' => 'Leads (form submissions) broken down by browser and device — which ones actually turn into leads.'],
            'geography' => ['label' => 'Geography', 'description' => 'Visitors by US state and country, and the share of located visitors inside Louisiana.'],
            'leads' => ['label' => 'Leads', 'description' => 'Lead summary: totals by status and by campaign, plus the most recent leads with their name, status, campaign, source, state, device and browser (never emails, phone numbers or messages).'],
        ];
    }

    public function has(string $id): bool
    {
        return array_key_exists($id, $this->options());
    }

    /**
     * Human-readable list for the planning prompt: "- id: description".
     */
    public function menu(): string
    {
        return collect($this->options())
            ->map(fn (array $option, string $id): string => "- {$id}: {$option['description']}")
            ->implode("\n");
    }

    /**
     * Load only the requested pieces of data.
     *
     * @param  list<string>  $ids
     * @return array<string, mixed>
     */
    public function resolve(array $ids, int $days): array
    {
        $data = [];

        foreach ($ids as $id) {
            if ($this->has($id)) {
                $data[$id] = $this->load($id, $days);
            }
        }

        return $data;
    }

    private function load(string $id, int $days): mixed
    {
        return match ($id) {
            'overview' => $this->overview($days),
            'daily_trend' => $this->analytics($days)['daily'],
            'long_term_trend' => ['weekly' => $this->analytics($days)['weekly'], 'monthly' => $this->analytics($days)['monthly']],
            'campaigns' => $this->campaigns($days),
            'traffic_sources' => $this->analytics($days)['sources'],
            'cta_clicks' => $this->analytics($days)['ctaLabels'],
            'apply_now_by_team_member' => $this->analytics($days)['teamMembers'],
            'top_pages' => $this->analytics($days)['pages'],
            'devices_browsers_os' => [
                'devices' => $this->analytics($days)['devices'],
                'browsers' => $this->analytics($days)['browsers'],
                'operating_systems' => $this->analytics($days)['systems'],
            ],
            'lead_conversion_by_agent' => [
                'leads_by_browser' => $this->analytics($days)['leadBrowsers'],
                'leads_by_device' => $this->analytics($days)['leadDevices'],
            ],
            'geography' => [
                'states' => $this->analytics($days)['states'],
                'countries' => $this->analytics($days)['countries'],
            ],
            'leads' => $this->leads($days),
        };
    }

    /**
     * Analytics are built in one go (a handful of cheap queries) and reused by every piece that needs them.
     *
     * @return array<string, mixed>
     */
    private function analytics(int $days): array
    {
        return $this->analytics ??= $this->stats->analytics(...$this->stats->window($days));
    }

    /**
     * @return array<string, mixed>
     */
    private function overview(int $days): array
    {
        $kpis = $this->stats->overview(...$this->stats->window($days))['kpis'];
        $totals = $this->analytics($days)['totals'];

        return [
            'visitors' => $totals['visitors'],
            'page_views' => $totals['pageViews'],
            'cta_clicks' => $totals['clicks'],
            'leads' => $totals['leads'],
            'conversion_percent' => $kpis['conversion']['value'],
            'change_vs_previous_period_percent' => [
                'visitors' => $kpis['visitors']['change'],
                'leads' => $kpis['leads']['change'],
                'cta_clicks' => $kpis['clicks']['change'],
            ],
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function campaigns(int $days): array
    {
        [$from, $to] = $this->stats->window($days);
        $inRange = fn (Builder $query) => $query->whereBetween('created_at', [$from, $to]);

        return Campaign::query()
            ->withCount(['leads' => $inRange, 'visits' => $inRange, 'ctaClicks' => $inRange])
            ->orderByDesc('leads_count')->orderByDesc('visits_count')
            ->get()
            ->map(function (Campaign $campaign): array {
                $visits = (int) $campaign->visits_count;
                $leads = (int) $campaign->leads_count;

                return [
                    'name' => $campaign->name,
                    'platform' => $campaign->platform->value,
                    'status' => $campaign->status->value,
                    'budget_usd' => $campaign->budget_cents !== null ? $campaign->budget_cents / 100 : null,
                    'visits' => $visits,
                    'cta_clicks' => (int) $campaign->cta_clicks_count,
                    'leads' => $leads,
                    'conversion_percent' => $visits > 0 ? round($leads / $visits * 100, 1) : 0.0,
                    'cost_per_lead_usd' => $leads > 0 && $campaign->budget_cents !== null ? round($campaign->budget_cents / 100 / $leads, 2) : null,
                ];
            })->all();
    }

    /**
     * This leaves the server for a third-party API, so it carries names (so the admin can ask who a
     * lead is) but never emails, phone numbers or free-text messages.
     *
     * @return array<string, mixed>
     */
    private function leads(int $days): array
    {
        [$from, $to] = $this->stats->window($days);
        $leads = Lead::query()->with('campaign:id,name')->whereBetween('created_at', [$from, $to]);

        return [
            'total' => (clone $leads)->count(),
            'by_status' => collect(LeadStatus::cases())->mapWithKeys(fn (LeadStatus $status): array => [
                $status->value => (clone $leads)->where('status', $status->value)->count(),
            ])->all(),
            'by_campaign' => (clone $leads)->get()
                ->groupBy(fn (Lead $lead): string => $lead->campaign?->name ?? 'No campaign')
                ->map(fn ($group): int => $group->count())->sortDesc()->all(),
            'recent' => (clone $leads)->latest()->limit(15)->get()->map(fn (Lead $lead): array => [
                'name' => $lead->full_name,
                'date' => $lead->created_at?->toDateString(),
                'status' => $lead->status->value,
                'campaign' => $lead->campaign?->name,
                'source' => $lead->utm_source,
                'state' => $lead->region_code,
                'device' => $lead->device_type,
                'browser' => $lead->browser,
            ])->all(),
        ];
    }
}
