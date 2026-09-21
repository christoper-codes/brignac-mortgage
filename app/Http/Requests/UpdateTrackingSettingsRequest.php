<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrackingSettingsRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge(collect(['meta_pixel_id', 'tiktok_pixel_id', 'google_analytics_id'])
            ->mapWithKeys(fn (string $field): array => [$field => strtoupper(trim((string) $this->input($field))) ?: null])
            ->all());
    }

    /**
     * These IDs end up inside inline scripts on every public page, so they are held to the exact
     * shape each platform uses instead of being accepted as free text.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'meta_pixel_id' => ['nullable', 'regex:/^\d{8,20}$/'],
            'tiktok_pixel_id' => ['nullable', 'regex:/^[A-Z0-9]{10,30}$/'],
            'google_analytics_id' => ['nullable', 'regex:/^G-[A-Z0-9]{6,12}$/'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'meta_pixel_id.regex' => 'A Meta Pixel ID is 8–20 digits, e.g. 123456789012345.',
            'tiktok_pixel_id.regex' => 'A TikTok Pixel ID is 10–30 capital letters and numbers, e.g. C1A2B3C4D5E6F7G8H9.',
            'google_analytics_id.regex' => 'A Google Analytics ID looks like G-XXXXXXXXXX.',
        ];
    }
}
