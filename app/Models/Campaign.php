<?php

namespace App\Models;

use App\Enums\CampaignPlatform;
use App\Enums\CampaignStatus;
use Database\Factories\CampaignFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'code', 'platform', 'status', 'budget_cents', 'starts_at', 'ends_at', 'notes'])]
class Campaign extends Model
{
    /** @use HasFactory<CampaignFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'platform' => CampaignPlatform::class,
            'status' => CampaignStatus::class,
            'starts_at' => 'date',
            'ends_at' => 'date',
        ];
    }

    /**
     * @return HasMany<Lead, $this>
     */
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    /**
     * @return HasMany<Visit, $this>
     */
    public function visits(): HasMany
    {
        return $this->hasMany(Visit::class);
    }

    /**
     * @return HasMany<CtaClick, $this>
     */
    public function ctaClicks(): HasMany
    {
        return $this->hasMany(CtaClick::class);
    }

    /**
     * The landing URL to paste into the ad: UTM tags identify this campaign on every visit and lead.
     */
    public function trackingUrl(): string
    {
        return rtrim(url('/'), '/').'/?'.http_build_query([
            'utm_source' => $this->platform->value,
            'utm_medium' => 'paid_social',
            'utm_campaign' => $this->code,
        ]);
    }
}
