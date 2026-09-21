<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Jobs\ResolveGeolocation;
use App\Models\Lead;
use App\Services\TrackingContext;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request, TrackingContext $context): RedirectResponse
    {
        $data = $request->validated();

        $lead = Lead::create([
            ...collect($data)->except('sms_consent')->all(),
            ...$context->device($request),
            'sms_consent_at' => now(),
            'campaign_id' => $context->campaignIdFor($data['utm_campaign'] ?? null),
        ]);

        ResolveGeolocation::dispatchAfterResponse($lead);

        return back()->with('status', 'lead-created');
    }
}
