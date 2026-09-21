<?php

namespace App\Models;

use Database\Factories\TrackingSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

#[Fillable(['meta_pixel_id', 'tiktok_pixel_id', 'google_analytics_id'])]
class TrackingSetting extends Model
{
    /** @use HasFactory<TrackingSettingFactory> */
    use HasFactory;

    private const CACHE_KEY = 'tracking-settings';

    /**
     * The site-wide IDs the public pages load their ad / analytics scripts with. Read on every page
     * load, so it is cached until the settings are saved.
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
