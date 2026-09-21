<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\LeadStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\LeadResource;
use App\Models\Campaign;
use App\Models\Lead;
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
            'filters' => $filters,
            'campaigns' => Campaign::query()->orderBy('name')->get(['id', 'name']),
            'statuses' => array_map(fn (LeadStatus $status): string => $status->value, LeadStatus::cases()),
            'states' => Lead::query()->whereNotNull('region_code')->distinct()->orderBy('region_code')->pluck('region_code'),
        ]);
    }

    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $data = $request->validate(['status' => ['required', Rule::enum(LeadStatus::class)]]);

        $lead->update($data);

        return back();
    }
}
