<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExportRangeRequest;
use App\Services\DashboardStats;
use App\Services\SpreadsheetExport;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * The analytics page as an Excel workbook, one sheet per table: everything recorded so far, or only
 * the chosen period.
 */
class AnalyticsExportController extends Controller
{
    public function __invoke(ExportRangeRequest $request, DashboardStats $stats, SpreadsheetExport $spreadsheet): StreamedResponse
    {
        [$from, $to] = $request->period() ?? $stats->allTimeWindow();
        $data = $stats->analytics($from, $to);

        $breakdown = fn (string $heading, array $rows): array => [[$heading, 'Total'], ...array_map(fn (array $row): array => [$row['label'], $row['total']], $rows)];

        return $spreadsheet->download("analytics-{$request->label()}.xlsx", [
            'Summary' => [
                ['Metric', 'Value'],
                ['From', $from->toDateString()],
                ['To', $to->toDateString()],
                ['Days', $data['days']],
                ['Visitors', $data['totals']['visitors']],
                ['Page views', $data['totals']['pageViews']],
                ['CTA clicks', $data['totals']['clicks']],
                ['Leads', $data['totals']['leads']],
                ['Visitors in '.DashboardStats::HOME_STATE.' (%)', $data['states']['homeShare']],
            ],
            'Daily' => [
                ['Date', 'Visitors', 'Page views', 'CTA clicks', 'Leads'],
                ...array_map(fn (array $day): array => [$day['date'], $day['visitors'], $day['pageViews'], $day['clicks'], $day['leads']], $data['daily']),
            ],
            'Weekly (last 12)' => [
                ['Week of', 'Visitors', 'Leads'],
                ...array_map(fn (array $week): array => [$week['label'], $week['visitors'], $week['leads']], $data['weekly']),
            ],
            'Monthly (last 12)' => [
                ['Month', 'Visitors', 'Leads'],
                ...array_map(fn (array $month): array => [$month['label'], $month['visitors'], $month['leads']], $data['monthly']),
            ],
            'States' => [
                ['State', 'Visitors'],
                ...array_map(fn (array $state): array => [$state['name'], $state['visitors']], $data['states']['rows']),
            ],
            'Countries' => $breakdown('Country', $data['countries']),
            'Traffic sources' => $breakdown('Source', $data['sources']),
            'CTA clicks' => $breakdown('Button', array_map(fn (array $row): array => ['label' => $row['label'], 'total' => $row['total']], $data['ctaLabels'])),
            'Top pages' => $breakdown('Page', $data['pages']),
            'Team members' => [
                ['Team member', 'Apply Now clicks', 'Phone / email clicks', 'Total clicks'],
                ...array_map(fn (array $row): array => [$row['member'], $row['applies'], $row['total'] - $row['applies'], $row['total']], $data['teamMembers']),
            ],
            'Devices' => $breakdown('Device', $data['devices']),
            'Browsers' => $breakdown('Browser', $data['browsers']),
            'Operating systems' => $breakdown('Operating system', $data['systems']),
            'Lead browsers' => $breakdown('Browser', $data['leadBrowsers']),
            'Lead devices' => $breakdown('Device', $data['leadDevices']),
        ]);
    }
}
