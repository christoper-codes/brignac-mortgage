<?php

namespace App\Http\Requests;

use App\Enums\CampaignPlatform;
use App\Enums\CampaignStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCampaignRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'nullable', 'string', 'max:100', 'regex:/^[a-z0-9_-]+$/',
                Rule::unique('campaigns', 'code')->ignore($this->route('campaign')),
            ],
            'platform' => ['required', Rule::enum(CampaignPlatform::class)],
            'status' => ['required', Rule::enum(CampaignStatus::class)],
            'budget' => ['nullable', 'numeric', 'min:0', 'max:10000000'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ];
    }
}
