<?php

namespace App\Http\Requests;

use App\Services\AiAssistant;
use App\Services\AiDataCatalog;
use Illuminate\Validation\Rule;

class AiAnswerRequest extends AiPlanRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'sources' => ['present', 'array', 'max:12'],
            'sources.*' => ['string', Rule::in(array_keys(app(AiDataCatalog::class)->options()))],
            'days' => ['required', 'integer', 'min:1', 'max:'.AiAssistant::MAX_DAYS],
        ];
    }
}
