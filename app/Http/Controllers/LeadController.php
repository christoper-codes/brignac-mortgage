<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Jobs\ResolveGeolocation;
use App\Jobs\SendMetaConversionEvent;
use App\Models\Lead;
use App\Services\TrackingContext;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request, TrackingContext $context): RedirectResponse
    {
        $data = $request->validated();

        $lead = Lead::create([
            ...collect($data)->except(['sms_consent', 'meta_event_id', 'fbp', 'fbc'])->all(),
            ...$context->device($request),
            'sms_consent_at' => now(),
            'campaign_id' => $context->campaignIdFor($data['utm_campaign'] ?? null),
        ]);

        ResolveGeolocation::dispatchAfterResponse($lead);

        // Priority #2 conversion: the contact form. Email/phone are hashed (Meta requires SHA-256,
        // lowercased/trimmed for email and digits-only for phone) to improve match quality without
        // sending raw PII off-site.
        SendMetaConversionEvent::dispatchAfterResponse(
            eventName: 'Lead',
            userData: [
                'client_ip_address' => $request->ip(),
                'client_user_agent' => $request->userAgent(),
                'fbp' => $data['fbp'] ?? null,
                'fbc' => $data['fbc'] ?? null,
                'em' => hash('sha256', strtolower(trim($lead->email))),
                'ph' => hash('sha256', preg_replace('/\D+/', '', $lead->phone) ?? ''),
            ],
            eventId: $data['meta_event_id'] ?? null,
            sourceUrl: $lead->landing_path ? url($lead->landing_path) : null,
        );

        return back()->with('status', 'lead-created');
    }
}
