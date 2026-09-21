<?php

namespace App\Http\Resources;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Lead
 */
class LeadResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
            'status' => $this->status->value,
            'campaign' => $this->campaign ? [
                'id' => $this->campaign->id,
                'name' => $this->campaign->name,
                'platform' => $this->campaign->platform->value,
            ] : null,
            'source' => $this->utm_source,
            'region_code' => $this->region_code,
            'region' => $this->region,
            'city' => $this->city,
            'country_code' => $this->country_code,
            'ip_address' => $this->ip_address,
            'device_type' => $this->device_type,
            'browser' => $this->browser,
            'os' => $this->os,
            'landing_path' => $this->landing_path,
            'sms_consent' => $this->sms_consent_at !== null,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
