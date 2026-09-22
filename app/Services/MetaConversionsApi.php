<?php

namespace App\Services;

use App\Models\TrackingSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Server-to-server counterpart to the browser Meta Pixel. Sends the same conversion events
 * (SubmitApplication, Lead) directly to Meta so they still count when a visitor blocks the browser
 * pixel, uses Safari/iOS (Intelligent Tracking Prevention), or has an ad blocker. Meta deduplicates
 * against the browser event automatically when both share the same event_id.
 *
 * Does nothing (silently) until a Pixel ID and an access token are both saved in Pixels settings.
 */
class MetaConversionsApi
{
    private const API_VERSION = 'v21.0';

    /**
     * @param  array<string, mixed>  $userData  client_ip_address, client_user_agent, fbp, fbc, em, ph…
     * @param  array<string, mixed>  $customData
     */
    public function send(
        string $eventName,
        array $userData,
        array $customData = [],
        ?string $eventId = null,
        ?string $sourceUrl = null,
    ): void {
        $pixelId = TrackingSetting::shared()['metaPixelId'] ?? null;
        $token = TrackingSetting::metaCapiToken();

        if (! $pixelId || ! $token) {
            return;
        }

        $event = [
            'event_name' => $eventName,
            'event_time' => now()->timestamp,
            'event_id' => $eventId ?: (string) str()->uuid(),
            'action_source' => 'website',
            'user_data' => array_filter($userData, fn ($value): bool => filled($value)),
            'custom_data' => array_filter($customData, fn ($value): bool => filled($value)),
        ];

        if ($sourceUrl) {
            $event['event_source_url'] = $sourceUrl;
        }

        $payload = ['data' => [$event], 'access_token' => $token];

        if ($testCode = TrackingSetting::metaTestEventCode()) {
            $payload['test_event_code'] = $testCode;
        }

        try {
            $response = Http::asJson()->timeout(4)->post(
                'https://graph.facebook.com/'.self::API_VERSION."/{$pixelId}/events",
                $payload,
            );

            if ($response->failed()) {
                Log::warning('Meta Conversions API rejected an event.', [
                    'event' => $eventName,
                    'status' => $response->status(),
                    'body' => $response->json(),
                ]);
            }
        } catch (Throwable $exception) {
            // A visitor's conversion is never blocked on Meta being reachable.
            Log::warning('Meta Conversions API call failed.', ['event' => $eventName, 'message' => $exception->getMessage()]);
        }
    }
}
