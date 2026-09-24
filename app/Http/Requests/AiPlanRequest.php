<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AiPlanRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'max:1000'],
            'history' => ['nullable', 'array', 'max:8'],
            'history.*.role' => ['required', 'string', 'in:user,assistant'],
            'history.*.content' => ['required', 'string', 'max:2000'],
        ];
    }

    /**
     * @return list<array{role: string, content: string}>
     */
    public function history(): array
    {
        return array_values($this->validated('history') ?? []);
    }
}
