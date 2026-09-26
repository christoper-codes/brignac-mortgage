<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\CampaignPlatform;
use App\Enums\CampaignStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CampaignController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'from' => ['nullable', 'date_format:Y-m-d'],
            'to' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:from'],
        ]);

        // A campaign is "in" a date range when its run (start → end) overlaps it. One with no start
        // date counts from the day it was created, and one with no end date is still running.
        $campaigns = Campaign::query()
            ->withCount(['leads', 'visits', 'ctaClicks'])
            ->when($filters['q'] ?? null, fn (Builder $query, string $term) => $query->where('name', 'like', "%{$term}%"))
            ->when($filters['from'] ?? null, fn (Builder $query, string $from) => $query->where(
                fn (Builder $query) => $query->whereNull('ends_at')->orWhereDate('ends_at', '>=', $from),
            ))
            ->when($filters['to'] ?? null, fn (Builder $query, string $to) => $query->whereRaw('coalesce(date(starts_at), date(created_at)) <= ?', [$to]))
            ->latest()
            ->get();

        return Inertia::render('dashboard/campaigns', [
            'filters' => $filters,
            'campaigns' => CampaignResource::collection($campaigns)->resolve(),
            'platforms' => collect(CampaignPlatform::cases())->map(fn (CampaignPlatform $platform): array => [
                'value' => $platform->value,
                'label' => $platform->label(),
            ])->all(),
            'statuses' => array_map(fn (CampaignStatus $status): string => $status->value, CampaignStatus::cases()),
        ]);
    }

    public function store(StoreCampaignRequest $request): RedirectResponse
    {
        Campaign::create($this->attributes($request));

        return back()->with('status', 'campaign-created');
    }

    public function update(StoreCampaignRequest $request, Campaign $campaign): RedirectResponse
    {
        $campaign->update($this->attributes($request, $campaign));

        return back()->with('status', 'campaign-updated');
    }

    public function destroy(Campaign $campaign): RedirectResponse
    {
        $campaign->delete();

        return back()->with('status', 'campaign-deleted');
    }

    /**
     * @return array<string, mixed>
     */
    private function attributes(StoreCampaignRequest $request, ?Campaign $campaign = null): array
    {
        $data = $request->validated();

        return [
            ...collect($data)->except('budget')->all(),
            'code' => $data['code'] ?? $campaign?->code ?? $this->uniqueCode($data['name']),
            'budget_cents' => isset($data['budget']) ? (int) round($data['budget'] * 100) : null,
        ];
    }

    private function uniqueCode(string $name): string
    {
        $base = Str::slug($name) ?: 'campaign';
        $code = $base;

        for ($suffix = 2; Campaign::query()->where('code', $code)->exists(); $suffix++) {
            $code = "{$base}-{$suffix}";
        }

        return $code;
    }
}
