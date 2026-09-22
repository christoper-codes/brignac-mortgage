<?php

namespace App\Models;

use Database\Factories\TrackingSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

#[Fillable(['meta_pixel_id', 'meta_capi_token', 'meta_test_event_code', 'tiktok_pixel_id', 'google_analytics_id'])]
class TrackingSetting extends Model
{
    /** @use HasFactory<TrackingSettingFactory> */
    use HasFactory;

    private const CACHE_KEY = 'tracking-settings';

    /**
     * The site-wide IDs the public pages load their ad / analytics scripts with. Safe to expose to
     * the browser — pixel IDs are not secret, they appear in every fbq()/ttq() init call anyway.
     * The Meta CAPI access token never goes through this method.
     *
     * @return array{metaPixelId: ?string, tiktokPixelId: ?string, googleAnalyticsId: ?string}
     */
    public static function shared(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function (): array {
            $setting = self::query()->first();

            return [
                'metaPixelId' => $setting?->meta_pixel_id,
                'tiktokPixelId' => $setting?->tiktok_pixel_id,
                'googleAnalyticsId' => $setting?->google_analytics_id,
            ];
        });
    }

    /**
     * The Meta Conversions API access token. Server-only — never render this in an Inertia prop or
     * a blade view.
     */
    public static function metaCapiToken(): ?string
    {
        return self::query()->value('meta_capi_token');
    }

    /**
     * Optional code from Events Manager's Test Events tool, sent along with every CAPI call while set.
     */
    public static function metaTestEventCode(): ?string
    {
        return self::query()->value('meta_test_event_code');
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public static function store(array $attributes): self
    {
        $setting = self::query()->first() ?? new self;
        $setting->fill($attributes)->save();

        Cache::forget(self::CACHE_KEY);

        return $setting;
    }
}
