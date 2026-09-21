<?php

namespace App\Http\Resources;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Campaign
 */
class CampaignResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $visits = (int) ($this->visits_count ?? 0);
        $leads = (int) ($this->leads_count ?? 0);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'platform' => $this->platform->value,
            'platform_label' => $this->platform->label(),
            'status' => $this->status->value,
            'budget' => $this->budget_cents !== null ? $this->budget_cents / 100 : null,
            'pixel_id' => $this->pixel_id,
            'starts_at' => $this->starts_at?->toDateString(),
            'ends_at' => $this->ends_at?->toDateString(),
            'notes' => $this->notes,
            'tracking_url' => $this->trackingUrl(),
            'visits_count' => $visits,
            'leads_count' => $leads,
            'clicks_count' => (int) ($this->cta_clicks_count ?? 0),
            'conversion' => $visits > 0 ? round($leads / $visits * 100, 1) : 0.0,
            'cost_per_lead' => $leads > 0 && $this->budget_cents !== null ? round($this->budget_cents / 100 / $leads, 2) : null,
        ];
    }
}
