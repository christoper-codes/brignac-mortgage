<?php

namespace App\Http\Controllers;

use App\Jobs\ResolveGeolocation;
use App\Models\CtaClick;
use App\Models\Visit;
use App\Services\TrackingContext;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrackingController extends Controller
{
    public function __construct(private TrackingContext $context) {}

    public function visit(Request $request): Response
    {
        $data = $request->validate([
            'visitor_id' => ['required', 'string', 'max:64'],
            'path' => ['required', 'string', 'max:512'],
            'referrer' => ['nullable', 'string', 'max:1024'],
            ...TrackingContext::utmRules(),
        ]);

        if ($this->context->isBot($request)) {
            return response()->noContent();
        }

        $visit = Visit::create([
            ...$data,
            ...$this->context->device($request),
            'referrer_host' => $this->referrerHost($data['referrer'] ?? null, $request),
            'campaign_id' => $this->context->campaignIdFor($data['utm_campaign'] ?? null),
        ]);

        ResolveGeolocation::dispatchAfterResponse($visit);

        return response()->noContent();
    }

    public function click(Request $request): Response
    {
        $data = $request->validate([
            'visitor_id' => ['required', 'string', 'max:64'],
            'label' => ['required', 'string', 'max:255'],
            'target' => ['nullable', 'string', 'max:1024'],
            'team_member' => ['nullable', 'string', 'max:255'],
            'path' => ['required', 'string', 'max:512'],
            'utm_campaign' => ['nullable', 'string', 'max:255'],
        ]);

        if ($this->context->isBot($request)) {
            return response()->noContent();
        }

        $click = CtaClick::create([
            'visitor_id' => $data['visitor_id'],
            'label' => $data['label'],
            'target' => $data['target'] ?? null,
            'team_member' => $data['team_member'] ?? null,
            'path' => $data['path'],
            ...$this->context->device($request),
            'campaign_id' => $this->context->campaignIdFor($data['utm_campaign'] ?? null),
        ]);

        ResolveGeolocation::dispatchAfterResponse($click);

        return response()->noContent();
    }

    /**
     * Host the visitor came from, ignoring our own site (internal navigation is not a source).
     */
    private function referrerHost(?string $referrer, Request $request): ?string
    {
        $host = $referrer ? parse_url($referrer, PHP_URL_HOST) : null;

        return $host && $host !== $request->getHost() ? $host : null;
    }
}
