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
            'dashboard_help' => ['label' => 'Dashboard help', 'description' => 'What each dashboard page is for (Overview, Campaigns, Leads, Analytics, AI assistant, Pixels), what it shows, how its filters and search work, how to export data to Excel, and how key numbers (visitors, conversion, cost per lead...) are calculated. Use this whenever the admin asks how to use the dashboard, where to find something, or how a number is worked out — not just when they ask for the numbers themselves.'],
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
            'dashboard_help' => $this->dashboardHelp(),
        };
    }

    /**
     * Static reference for the admin dashboard itself — not website analytics, but what each page
     * does, how its filters/search/export work, and how the headline numbers are defined. Doesn't
     * depend on the period, so it's the same regardless of the "days" the plan step picked.
     *
     * @return array<string, mixed>
     */
    private function dashboardHelp(): array
    {
        return [
            'pages' => [
                'overview' => [
                    'route' => '/dashboard',
                    'purpose' => 'The landing page: a quick read on how campaigns are performing right now.',
                    'shows' => ['4 KPI cards: Visitors, Leads, CTA clicks, Conversion (leads ÷ visitors)', 'Visitors per day bar chart', 'Where visitors are (by US state, plus % inside Louisiana)', 'Top 5 campaigns by leads', 'The 5 most recent leads'],
                    'filters' => 'Date range at the top: presets Today / 7d / 30d / 90d, or an exact From–To range typed with the date picker. A custom range overrides the presets. Every number on the page updates to that range.',
                    'export' => 'No export on this page — use Leads or Analytics for that.',
                ],
                'campaigns' => [
                    'route' => '/dashboard/campaigns',
                    'purpose' => 'Create and manage the tracking link for each ad, and see what it brought in.',
                    'shows' => ['One card per campaign: platform (Facebook/Instagram/TikTok), status, budget, and its all-time Visits, Leads, Clicks, Conversion % and cost per lead', 'The tracking link to paste into the ad (adds UTM parameters automatically)'],
                    'filters' => 'Search by campaign name, and a From–To date range. A campaign matches the date range when its own start–end run overlaps it (no start date counts from when it was created; no end date means still running). Important: this filter only decides which campaign cards are shown — the Visits/Leads/Clicks/Conversion numbers on each card are always all-time totals for that campaign, not scoped to the filter.',
                    'export' => 'No export here — use "New campaign" to create one, the pencil icon to edit, the trash icon to delete.',
                    'other' => 'Creating or editing a campaign opens a form for name, platform, status, budget, start/end dates and an optional custom tracking code.',
                ],
                'leads' => [
                    'route' => '/dashboard/leads',
                    'purpose' => 'Every person who submitted the contact form, with where they came from and how to reach them.',
                    'shows' => ['Name, email, phone, message, SMS consent', 'Campaign/source, submission date', 'Location (city/state), device, browser, OS, IP address', 'Status: New, Contacted, Qualified, Closed, Lost — changeable right on the card', '"View journey": every page they visited and every button they clicked, in order, leading up to the form submission'],
                    'filters' => 'Search by name/email/phone, plus dropdowns for campaign, status and state. Results are paginated 10 per page, or "View all" to show every match on one page.',
                    'export' => 'The "Export to Excel" button opens a dialog: download all leads, or only leads from a specific date range (both a From and a To date are required). The file has the same details as the cards — everything except the journey.',
                ],
                'analytics' => [
                    'route' => '/dashboard/analytics',
                    'purpose' => 'The deep-dive version of Overview: who visits, from where, on what, and what they click.',
                    'shows' => ['Totals: Visitors, Page views, CTA clicks, Leads', 'Apply Now clicks by team member (who visitors prefer to work with)', 'Visitors per day/week/month', 'Visitors by US state and country', 'Traffic sources, CTA clicks, top pages', 'Devices, browsers, operating systems — and which of those actually turn into leads'],
                    'filters' => 'Same date filter as Overview: Today / 7d / 30d / 90d presets or a custom From–To range. Note: the weekly and monthly charts always show the last 12 weeks/months regardless of this filter — everything else on the page respects it.',
                    'export' => '"Export to Excel" downloads either everything recorded so far, or one chosen date range, as a workbook with one sheet per table on the page (Summary, Daily, Weekly, Monthly, States, Countries, Traffic sources, CTA clicks, Top pages, Team members, Devices, Browsers, Operating systems, Lead browsers, Lead devices).',
                ],
                'ai_assistant' => [
                    'route' => '/dashboard/ai',
                    'purpose' => 'This chat. Answers questions about the website\'s own data, campaigns, marketing tech, mortgage lending, and how to use this dashboard.',
                ],
                'pixels' => [
                    'route' => '/dashboard/tracking',
                    'purpose' => 'Where ad tracking pixels are configured, so conversions get reported back to each ad platform.',
                    'shows' => ['Meta Pixel ID and server-side Conversions API access token (for Facebook/Instagram)', 'TikTok Pixel ID', 'Google Analytics measurement ID'],
                    'other' => 'The Conversions API token is never shown again once saved — only that one is set, and its last 4 characters.',
                ],
            ],
            'how_numbers_are_defined' => [
                'visitors' => 'Distinct visitor_id in the period — a person reloading the page ten times still counts once.',
                'page_views' => 'Every page load, including repeat visits from the same person.',
                'conversion' => 'Leads ÷ visitors, as a percentage.',
                'cost_per_lead' => "A campaign's budget ÷ its lead count (only shown once a budget is set and at least one lead came in).",
                'home_state_share' => 'Of visitors whose location could be determined, the % that are in Louisiana (LA) — the brokerage\'s licensed state.',
            ],
        ];
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
