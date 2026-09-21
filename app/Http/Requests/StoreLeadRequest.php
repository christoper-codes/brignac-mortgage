<?php

namespace App\Http\Requests;

use App\Services\TrackingContext;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:32', 'regex:/^[0-9+\-\s().]{7,32}$/'],
            'message' => ['nullable', 'string', 'max:2000'],
            'sms_consent' => ['accepted'],
            'visitor_id' => ['nullable', 'string', 'max:64'],
            'landing_path' => ['nullable', 'string', 'max:512'],
            'referrer' => ['nullable', 'string', 'max:1024'],
            ...TrackingContext::utmRules(),
        ];
    }
}
