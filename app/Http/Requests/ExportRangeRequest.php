<?php

namespace App\Http\Requests;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;

/**
 * What an Excel export covers: everything (no dates), or an exact from–to period (both dates).
 */
class ExportRangeRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'from' => ['nullable', 'required_with:to', 'date_format:Y-m-d', 'after_or_equal:2000-01-01'],
            'to' => ['nullable', 'required_with:from', 'date_format:Y-m-d', 'after_or_equal:from'],
        ];
    }

    /**
     * The chosen period, whole days at both ends, or null when everything is requested.
     *
     * @return array{0: CarbonImmutable, 1: CarbonImmutable}|null
     */
    public function period(): ?array
    {
        if (! $this->filled('from') || ! $this->filled('to')) {
            return null;
        }

        return [
            CarbonImmutable::parse($this->string('from')->toString())->startOfDay(),
            CarbonImmutable::parse($this->string('to')->toString())->endOfDay(),
        ];
    }

    /**
     * Suffix for the downloaded file name: "all" or "2026-01-01_to_2026-01-31".
     */
    public function label(): string
    {
        $period = $this->period();

        return $period === null ? 'all' : $period[0]->toDateString().'_to_'.$period[1]->toDateString();
    }
}
