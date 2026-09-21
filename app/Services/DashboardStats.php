<?php

namespace App\Services;

use App\Http\Resources\LeadResource;
use App\Models\Campaign;
use App\Models\CtaClick;
use App\Models\Lead;
use App\Models\Visit;
use Carbon\CarbonImmutable;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Builder;

/**
 * Read-side numbers for the dashboard. "Visitors" always means distinct visitor ids, so a person
 * reloading a page ten times counts once; "page views" counts every load.
 */
class DashboardStats
{
    public const HOME_STATE = 'LA';

    /**
     * @return array<string, mixed>
     */
    public function overview(int $days): array
    {
        [$from, $to] = $this->window($days);
        $previousFrom = $from->subDays($days);
        $previousTo = $from->subSecond();

        $visitors = $this->uniqueVisitors($from, $to);
        $leads = Lead::query()->whereBetween('created_at', [$from, $to])->count();
        $clicks = CtaClick::query()->whereBetween('created_at', [$from, $to])->count();

        return [
            'days' => $days,
            'kpis' => [
                'visitors' => $this->kpi($visitors, $this->uniqueVisitors($previousFrom, $previousTo)),
                'leads' => $this->kpi($leads, Lead::query()->whereBetween('created_at', [$previousFrom, $previousTo])->count()),
                'clicks' => $this->kpi($clicks, CtaClick::query()->whereBetween('created_at', [$previousFrom, $previousTo])->count()),
                'conversion' => ['value' => $visitors > 0 ? round($leads / $visitors * 100, 1) : 0.0],
            ],
            'series' => $this->dailySeries($from, $to),
            'topCampaigns' => $this->topCampaigns($from, $to),
            'states' => $this->states($from, $to, 6),
            'recentLeads' => LeadResource::collection(Lead::query()->with('campaign')->latest()->limit(5)->get())->resolve(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function analytics(int $days): array
    {
        [$from, $to] = $this->window($days);

        return [
            'days' => $days,
            'totals' => [
                'visitors' => $this->uniqueVisitors($from, $to),
                'pageViews' => Visit::query()->whereBetween('created_at', [$from, $to])->count(),
                'clicks' => CtaClick::query()->whereBetween('created_at', [$from, $to])->count(),
                'leads' => Lead::query()->whereBetween('created_at', [$from, $to])->count(),
            ],
            'daily' => $this->dailySeries($from, $to),
            'weekly' => $this->periodSeries('week'),
            'monthly' => $this->periodSeries('month'),
            'states' => $this->states($from, $to, 10),
            'countries' => $this->visitorBreakdown($from, $to, 'country_code', 5),
            'devices' => $this->visitorBreakdown($from, $to, 'device_type', 4),
            'browsers' => $this->visitorBreakdown($from, $to, 'browser', 6),
            'systems' => $this->visitorBreakdown($from, $to, 'os', 6),
            'sources' => $this->sources($from, $to),
            'pages' => $this->topPages($from, $to),
            'ctaLabels' => CtaClick::query()
                ->selectRaw('label, count(*) as total')
                ->whereBetween('created_at', [$from, $to])
                ->groupBy('label')->orderByDesc('total')->limit(8)->get()
                ->map(fn ($row): array => ['label' => $row->label, 'total' => (int) $row->total])->all(),
            // Which agents (browser / device) actually turn into leads.
            'leadBrowsers' => $this->leadBreakdown($from, $to, 'browser'),
            'leadDevices' => $this->leadBreakdown($from, $to, 'device_type'),
        ];
    }

    /**
     * @return array{0: CarbonImmutable, 1: CarbonImmutable}
     */
    private function window(int $days): array
    {
        $to = CarbonImmutable::now()->endOfDay();

        return [$to->subDays($days - 1)->startOfDay(), $to];
    }

    private function uniqueVisitors(CarbonImmutable $from, CarbonImmutable $to): int
    {
        return Visit::query()->whereBetween('created_at', [$from, $to])->distinct()->count('visitor_id');
    }

    /**
     * @return array{value: int, change: ?float}
     */
    private function kpi(int $current, int $previous): array
    {
        return [
            'value' => $current,
            'change' => $previous > 0 ? round(($current - $previous) / $previous * 100, 1) : null,
        ];
    }

    /**
     * One entry per day (zero-filled) with visitors, page views, CTA clicks and leads.
     *
     * @return list<array{date: string, visitors: int, pageViews: int, clicks: int, leads: int}>
     */
    private function dailySeries(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $visits = Visit::query()
            ->selectRaw('date(created_at) as day, count(distinct visitor_id) as visitors, count(*) as page_views')
            ->whereBetween('created_at', [$from, $to])->groupBy('day')->get()->keyBy('day');
        $clicks = CtaClick::query()
            ->selectRaw('date(created_at) as day, count(*) as total')
            ->whereBetween('created_at', [$from, $to])->groupBy('day')->pluck('total', 'day');
        $leads = Lead::query()
            ->selectRaw('date(created_at) as day, count(*) as total')
            ->whereBetween('created_at', [$from, $to])->groupBy('day')->pluck('total', 'day');

        return collect(CarbonPeriod::create($from, $to))->map(function ($date) use ($visits, $clicks, $leads): array {
            $day = $date->format('Y-m-d');

            return [
                'date' => $day,
                'visitors' => (int) ($visits[$day]->visitors ?? 0),
                'pageViews' => (int) ($visits[$day]->page_views ?? 0),
                'clicks' => (int) ($clicks[$day] ?? 0),
                'leads' => (int) ($leads[$day] ?? 0),
            ];
        })->all();
    }

    /**
     * Distinct visitors for each of the last 12 weeks or months.
     *
     * @return list<array{label: string, visitors: int, leads: int}>
     */
    private function periodSeries(string $unit): array
    {
        $now = CarbonImmutable::now();

        return collect(range(11, 0))->map(function (int $ago) use ($unit, $now): array {
            $start = $unit === 'week' ? $now->startOfWeek()->subWeeks($ago) : $now->startOfMonth()->subMonths($ago);
            $end = $unit === 'week' ? $start->endOfWeek() : $start->endOfMonth();

            return [
                'label' => $unit === 'week' ? $start->format('M j') : $start->format('M'),
                'visitors' => $this->uniqueVisitors($start, $end),
                'leads' => Lead::query()->whereBetween('created_at', [$start, $end])->count(),
            ];
        })->all();
    }

    /**
     * @return list<array{name: string, platform: string, leads: int, visits: int}>
     */
    private function topCampaigns(CarbonImmutable $from, CarbonImmutable $to): array
    {
        return Campaign::query()
            ->withCount([
                'leads' => fn (Builder $query) => $query->whereBetween('created_at', [$from, $to]),
                'visits' => fn (Builder $query) => $query->whereBetween('created_at', [$from, $to]),
            ])
            ->orderByDesc('leads_count')->orderByDesc('visits_count')
            ->limit(5)->get()
            ->map(fn (Campaign $campaign): array => [
                'name' => $campaign->name,
                'platform' => $campaign->platform->value,
                'leads' => $campaign->leads_count,
                'visits' => $campaign->visits_count,
            ])->all();
    }

    /**
     * Visitors per US state, plus how much of the located traffic is inside the licensed state.
     *
     * @return array{rows: list<array{code: string, name: string, visitors: int}>, homeShare: ?float, located: int}
     */
    private function states(CarbonImmutable $from, CarbonImmutable $to, int $limit): array
    {
        $rows = Visit::query()
            ->selectRaw('region_code, max(region) as region, count(distinct visitor_id) as total')
            ->whereBetween('created_at', [$from, $to])->whereNotNull('region_code')
            ->groupBy('region_code')->orderByDesc('total')->get();

        $located = (int) $rows->sum('total');
        $home = (int) ($rows->firstWhere('region_code', self::HOME_STATE)->total ?? 0);

        return [
            'rows' => $rows->take($limit)->map(fn ($row): array => [
                'code' => $row->region_code,
                'name' => $row->region ?: $row->region_code,
                'visitors' => (int) $row->total,
            ])->values()->all(),
            'homeShare' => $located > 0 ? round($home / $located * 100, 1) : null,
            'located' => $located,
        ];
    }

    /**
     * @return list<array{label: string, total: int}>
     */
    private function visitorBreakdown(CarbonImmutable $from, CarbonImmutable $to, string $column, int $limit): array
    {
        return Visit::query()
            ->selectRaw("{$column} as label, count(distinct visitor_id) as total")
            ->whereBetween('created_at', [$from, $to])->whereNotNull($column)
            ->groupBy($column)->orderByDesc('total')->limit($limit)->get()
            ->map(fn ($row): array => ['label' => (string) $row->label, 'total' => (int) $row->total])->all();
    }

    /**
     * @return list<array{label: string, total: int}>
     */
    private function leadBreakdown(CarbonImmutable $from, CarbonImmutable $to, string $column): array
    {
        return Lead::query()
            ->selectRaw("{$column} as label, count(*) as total")
            ->whereBetween('created_at', [$from, $to])->whereNotNull($column)
            ->groupBy($column)->orderByDesc('total')->limit(6)->get()
            ->map(fn ($row): array => ['label' => (string) $row->label, 'total' => (int) $row->total])->all();
    }

    /**
     * Where visitors come from: the UTM source when there is one, otherwise the referring site.
     *
     * @return list<array{label: string, total: int}>
     */
    private function sources(CarbonImmutable $from, CarbonImmutable $to): array
    {
        return Visit::query()
            ->selectRaw("coalesce(nullif(utm_source, ''), referrer_host, 'Direct') as label, count(distinct visitor_id) as total")
            ->whereBetween('created_at', [$from, $to])
            ->groupBy('label')->orderByDesc('total')->limit(8)->get()
            ->map(fn ($row): array => ['label' => (string) $row->label, 'total' => (int) $row->total])->all();
    }

    /**
     * @return list<array{label: string, total: int}>
     */
    private function topPages(CarbonImmutable $from, CarbonImmutable $to): array
    {
        return Visit::query()
            ->selectRaw('path as label, count(*) as total')
            ->whereBetween('created_at', [$from, $to])
            ->groupBy('path')->orderByDesc('total')->limit(8)->get()
            ->map(fn ($row): array => ['label' => (string) $row->label, 'total' => (int) $row->total])->all();
    }
}
