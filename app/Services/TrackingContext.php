<?php

namespace App\Services;

use App\Models\Campaign;
use App\Support\UserAgentParser;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Everything the server can learn about a tracked request on its own: IP, device, browser and OS,
 * plus the campaign the visitor's UTM tags point at.
 */
class TrackingContext
{
    public const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    /**
     * @return array{ip_address: ?string, user_agent: string, device_type: string, browser: string, os: string}
     */
    public function device(Request $request): array
    {
        $userAgent = (string) $request->userAgent();
        $parsed = UserAgentParser::parse($userAgent);

        return [
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit($userAgent, 500, ''),
            'device_type' => $parsed['device_type'],
            'browser' => $parsed['browser'],
            'os' => $parsed['os'],
        ];
    }

    public function isBot(Request $request): bool
    {
        return UserAgentParser::parse($request->userAgent())['is_bot'];
    }

    public function campaignIdFor(?string $utmCampaign): ?int
    {
        return $utmCampaign ? Campaign::query()->where('code', $utmCampaign)->value('id') : null;
    }

    /**
     * @return array<string, string>
     */
    public static function utmRules(): array
    {
        return array_fill_keys(self::UTM_FIELDS, 'nullable|string|max:255');
    }
}
