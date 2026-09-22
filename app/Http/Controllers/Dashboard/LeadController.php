<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\LeadStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\LeadResource;
use App\Models\Campaign;
use App\Models\CtaClick;
use App\Models\Lead;
use App\Models\Visit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'campaign' => ['nullable', 'integer'],
            'status' => ['nullable', Rule::enum(LeadStatus::class)],
            'state' => ['nullable', 'string', 'max:8'],
        ]);

        $leads = Lead::query()
            ->with('campaign')
            ->when($filters['q'] ?? null, fn ($query, string $term) => $query->where(function ($query) use ($term): void {
                $query->where('full_name', 'like', "%{$term}%")
                    ->orWhere('email', 'like', "%{$term}%")
                    ->orWhere('phone', 'like', "%{$term}%");
            }))
            ->when($filters['campaign'] ?? null, fn ($query, int $campaign) => $query->where('campaign_id', $campaign))
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->when($filters['state'] ?? null, fn ($query, string $state) => $query->where('region_code', $state))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('dashboard/leads', [
            'leads' => LeadResource::collection($leads),
            'journeys' => $this->journeysFor($leads->items()),
            'filters' => $filters,
            'campaigns' => Campaign::query()->orderBy('name')->get(['id', 'name']),
            'statuses' => array_map(fn (LeadStatus $status): string => $status->value, LeadStatus::cases()),
            'states' => Lead::query()->whereNotNull('region_code')->distinct()->orderBy('region_code')->pluck('region_code'),
        ]);
    }

    /**
     * Reconstruct each lead's path to conversion: every page view and CTA click made by the same
     * visitor (same browser, via the `bm_vid` id), in order, up to the moment they submitted the form.
     *
     * @param  array<int, Lead>  $leads
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function journeysFor(array $leads): array
    {
        $visitorIds = collect($leads)->pluck('visitor_id')->filter()->unique()->values();

        if ($visitorIds->isEmpty()) {
            return [];
        }

        $visits = Visit::query()->whereIn('visitor_id', $visitorIds)->orderBy('created_at')->get(['visitor_id', 'path', 'created_at'])
            ->map(fn (Visit $visit): array => [
                'visitor_id' => $visit->visitor_id,
                'type' => 'visit',
                'path' => $visit->path,
                'label' => null,
                'team_member' => null,
                'created_at' => $visit->created_at?->toIso8601String(),
            ]);

        $clicks = CtaClick::query()->whereIn('visitor_id', $visitorIds)->orderBy('created_at')->get(['visitor_id', 'label', 'team_member', 'path', 'created_at'])
            ->map(fn (CtaClick $click): array => [
                'visitor_id' => $click->visitor_id,
                'type' => 'click',
                'path' => $click->path,
                'label' => $click->label,
                'team_member' => $click->team_member,
                'created_at' => $click->created_at?->toIso8601String(),
            ]);

        $byVisitor = $visits->merge($clicks)->groupBy('visitor_id');

        return $visitorIds->mapWithKeys(fn (string $visitorId): array => [
            $visitorId => $byVisitor->get($visitorId, collect())->sortBy('created_at')->values()->all(),
        ])->all();
    }

    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $data = $request->validate(['status' => ['required', Rule::enum(LeadStatus::class)]]);

        $lead->update($data);

        return back();
    }
}
