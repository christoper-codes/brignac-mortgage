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

        $this->merge([
            'meta_capi_token' => trim((string) $this->input('meta_capi_token')) ?: null,
            'meta_test_event_code' => strtoupper(trim((string) $this->input('meta_test_event_code'))) ?: null,
        ]);
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
            // System User tokens from Meta are long opaque strings (letters, digits, and | _ - .).
            'meta_capi_token' => ['nullable', 'string', 'min:20', 'max:512', 'regex:/^[A-Za-z0-9|_.\-]+$/'],
            'meta_test_event_code' => ['nullable', 'regex:/^TEST[A-Z0-9]+$/'],
            'tiktok_pixel_id' => ['nullable', 'regex:/^[A-Z0-9]{10,30}$/'],
            'google_analytics_id' => ['nullable', 'regex:/^G-[A-Z0-9]{6,12}$/'],
            'clear_meta_capi_token' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'meta_pixel_id.regex' => 'A Meta Pixel ID is 8–20 digits, e.g. 123456789012345.',
            'meta_capi_token.min' => 'That does not look like a full access token — copy the whole string from Events Manager.',
            'meta_capi_token.regex' => 'A Conversions API token only contains letters, digits, and | _ - .',
            'meta_test_event_code.regex' => 'A test event code looks like TEST12345, from Events Manager → Test Events.',
            'tiktok_pixel_id.regex' => 'A TikTok Pixel ID is 10–30 capital letters and numbers, e.g. C1A2B3C4D5E6F7G8H9.',
            'google_analytics_id.regex' => 'A Google Analytics ID looks like G-XXXXXXXXXX.',
        ];
    }
}
