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

        // Computed before wrapping in LeadResource below: ->collection() replaces the paginator's
        // items with resources in place, so ->items() would no longer yield Lead models afterward.
        $journeys = $this->journeysFor($leads->items());

        return Inertia::render('dashboard/leads', [
            'leads' => LeadResource::collection($leads),
            'journeys' => $journeys,
            'filters' => $filters,
            'campaigns' => Campaign::query()->orderBy('name')->get(['id', 'name']),
            'statuses' => array_map(fn (LeadStatus $status): string => $status->value, LeadStatus::cases()),
            'states' => Lead::query()->whereNotNull('region_code')->distinct()->orderBy('region_code')->pluck('region_code'),
        ]);
    }

    /**
     * Reconstruct each lead's path to conversion: every page view and CTA click made by the same
     * visitor (same browser, via the `bm_vid` id), in order, between their previous submission (if
     * any) and this one. Keyed by lead id, not visitor_id — so a repeat visitor who converts more
     * than once gets one distinct trail per lead, instead of every later lead re-showing everything
     * since the start of that browser's history.
     *
     * @param  array<int, Lead>  $leads
     * @return array<int, array<int, array<string, mixed>>>
     */
    private function journeysFor(array $leads): array
    {
        $visitorIds = collect($leads)->pluck('visitor_id')->filter()->unique()->values();

        if ($visitorIds->isEmpty()) {
            return collect($leads)->mapWithKeys(fn (Lead $lead): array => [$lead->id => []])->all();
        }

        $visits = Visit::query()->whereIn('visitor_id', $visitorIds)->orderBy('created_at')->get(['visitor_id', 'path', 'created_at'])
            ->map(fn (Visit $visit): array => [
                'visitor_id' => $visit->visitor_id,
                'type' => 'visit',
                'path' => $visit->path,
                'label' => null,
                'team_member' => null,
                'created_at' => $visit->created_at,
            ]);

        $clicks = CtaClick::query()->whereIn('visitor_id', $visitorIds)->orderBy('created_at')->get(['visitor_id', 'label', 'team_member', 'path', 'created_at'])
            ->map(fn (CtaClick $click): array => [
                'visitor_id' => $click->visitor_id,
                'type' => 'click',
                'path' => $click->path,
                'label' => $click->label,
                'team_member' => $click->team_member,
                'created_at' => $click->created_at,
            ]);

        $byVisitor = $visits->merge($clicks)->groupBy('visitor_id');

        // A visitor who has converted before (submitted a lead) shouldn't have that already-told
        // story bleed into a later lead of theirs — every journey starts right after their previous
        // submission, not from the beginning of that browser's history.
        $leadsByVisitor = Lead::query()->whereIn('visitor_id', $visitorIds)->orderBy('created_at')->get(['visitor_id', 'created_at'])->groupBy('visitor_id');

        return collect($leads)->mapWithKeys(function (Lead $lead) use ($byVisitor, $leadsByVisitor): array {
            if (! $lead->visitor_id) {
                return [$lead->id => []];
            }

            $lowerBound = $leadsByVisitor->get($lead->visitor_id, collect())
                ->pluck('created_at')
                ->filter(fn ($createdAt) => $createdAt->lt($lead->created_at))
                ->max();

            $events = $byVisitor->get($lead->visitor_id, collect())
                ->filter(fn (array $event) => $event['created_at'] !== null
                    && $event['created_at']->lte($lead->created_at)
                    && (! $lowerBound || $event['created_at']->gt($lowerBound)))
                ->sortBy('created_at')
                ->map(fn (array $event): array => [...$event, 'created_at' => $event['created_at']->toIso8601String()])
                ->values()
                ->all();

            return [$lead->id => $events];
        })->all();
    }

    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $data = $request->validate(['status' => ['required', Rule::enum(LeadStatus::class)]]);

        $lead->update($data);

        return back();
    }
}
