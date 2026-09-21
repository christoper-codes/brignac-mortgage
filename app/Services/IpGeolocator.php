<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Throwable;

class IpGeolocator
{
    /**
     * Country / state / city for a public IP, cached per address. Private and local addresses
     * (127.0.0.1, 192.168.x.x…) resolve to nothing instead of hitting the lookup service.
     *
     * @return array{country_code?: string, region_code?: string, region?: string, city?: string}
     */
    public function lookup(?string $ip): array
    {
        if (! $ip || ! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return [];
        }

        return Cache::remember('geo:'.$ip, now()->addDays(30), fn (): array => $this->fetch($ip));
    }

    /**
     * @return array{country_code?: string, region_code?: string, region?: string, city?: string}
     */
    private function fetch(string $ip): array
    {
        try {
            $response = Http::timeout(3)->get(str_replace('{ip}', $ip, config('services.geolocation.url')));
        } catch (Throwable) {
            return [];
        }

        if (! $response->successful() || $response->json('status') !== 'success') {
            return [];
        }

        return array_filter([
            'country_code' => $response->json('countryCode'),
            'region_code' => $response->json('region'),
            'region' => $response->json('regionName'),
            'city' => $response->json('city'),
        ]);
    }
}
