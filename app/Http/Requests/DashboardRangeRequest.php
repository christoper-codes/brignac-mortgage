<?php

namespace App\Http\Requests;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;

/**
 * The period every dashboard stats page is filtered by: a preset (today, 7, 30 or 90 days) or, when
 * both `from` and `to` are given, an exact date range that wins over the preset.
 */
class DashboardRangeRequest extends FormRequest
{
    public const PRESETS = [1, 7, 30, 90];

    public const DEFAULT_DAYS = 30;

    /** Longest custom range that is charted, so a stray year-1 date can't build a huge series. */
    public const MAX_CUSTOM_DAYS = 366;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'from' => ['nullable', 'date_format:Y-m-d'],
            'to' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:from'],
        ];
    }

    public function isCustom(): bool
    {
        return $this->filled('from') && $this->filled('to');
    }

    /**
     * @return array{0: CarbonImmutable, 1: CarbonImmutable}
     */
    public function window(): array
    {
        if ($this->isCustom()) {
            $to = CarbonImmutable::parse($this->string('to')->toString())->endOfDay();
            $from = CarbonImmutable::parse($this->string('from')->toString())->startOfDay();

            return [max($from, $to->subDays(self::MAX_CUSTOM_DAYS - 1)->startOfDay()), $to];
        }

        $to = CarbonImmutable::now()->endOfDay();

        return [$to->subDays($this->presetDays() - 1)->startOfDay(), $to];
    }

    /**
     * What the range switch highlights: the preset's day count, or "custom" for an exact range.
     */
    public function selection(): int|string
    {
        return $this->isCustom() ? 'custom' : $this->presetDays();
    }

    private function presetDays(): int
    {
        return in_array($this->integer('range'), self::PRESETS, true) ? $this->integer('range') : self::DEFAULT_DAYS;
    }
}
