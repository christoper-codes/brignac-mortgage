<?php

namespace App\Services;

use Shuchkin\SimpleXLSXGen;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Builds .xlsx downloads. Uses a pure-PHP writer (no ext-zip needed), so it behaves the same on every server.
 */
class SpreadsheetExport
{
    /**
     * One sheet per entry: the first row is the header row (bold, frozen, filterable), the rest is data.
     * Text is written as raw strings, so a lead's message can never be read as markup or as a formula.
     *
     * @param  array<string, list<list<bool|float|int|string|null>>>  $sheets  Sheet name => rows
     */
    public function download(string $filename, array $sheets): StreamedResponse
    {
        $workbook = SimpleXLSXGen::create();

        foreach ($sheets as $name => $rows) {
            $workbook->addSheet($this->format($rows), $name)
                ->freezePanes('A2')
                ->autoFilter('A1:'.SimpleXLSXGen::coord2cell(max(count($rows[0] ?? []), 1) - 1).max(count($rows), 1));

            foreach ($rows[0] ?? [] as $index => $header) {
                $workbook->setColWidth($index + 1, max(12, min(45, mb_strlen((string) $header) + 6)));
            }
        }

        return response()->streamDownload(
            fn () => print ((string) $workbook),
            $filename,
            ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        );
    }

    /**
     * @param  list<list<bool|float|int|string|null>>  $rows
     * @return list<list<bool|float|int|string|null>>
     */
    private function format(array $rows): array
    {
        return array_map(
            fn (array $row, int $position): array => array_map(
                fn ($cell) => match (true) {
                    $position === 0 => '<b>'.htmlspecialchars((string) $cell, ENT_XML1).'</b>',
                    is_string($cell) => SimpleXLSXGen::raw($cell),
                    is_bool($cell) => $cell ? 'Yes' : 'No',
                    default => $cell,
                },
                $row,
            ),
            $rows,
            array_keys($rows),
        );
    }
}
