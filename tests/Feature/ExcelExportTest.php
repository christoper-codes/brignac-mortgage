<?php

use App\Models\Campaign;
use App\Models\CtaClick;
use App\Models\Lead;
use App\Models\User;
use App\Models\Visit;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

/**
 * Unpacks the entries of an .xlsx (a zip) so a test can read the sheet names and cell text.
 *
 * @return array<string, string>
 */
function xlsxParts(string $binary): array
{
    $parts = [];
    $offset = 0;

    while (substr($binary, $offset, 4) === "PK\x03\x04") {
        $header = unpack('vversion/vflags/vmethod/vtime/vdate/Vcrc/Vcsize/Vusize/vnamelength/vextralength', substr($binary, $offset + 4, 26));
        $name = substr($binary, $offset + 30, $header['namelength']);
        $start = $offset + 30 + $header['namelength'] + $header['extralength'];
        $data = substr($binary, $start, $header['csize']);
        $parts[$name] = $header['method'] === 8 ? gzinflate($data) : $data;
        $offset = $start + $header['csize'];
    }

    return $parts;
}

test('guests cannot download the exports', function (string $route) {
    auth()->logout();

    $this->get(route($route))->assertRedirect(route('login'));
})->with(['dashboard.leads.export', 'dashboard.analytics.export']);

test('every lead can be exported with the card details', function () {
    $campaign = Campaign::factory()->create(['name' => 'Spring FHA']);
    Lead::factory()->create([
        'full_name' => 'Maria Lopez', 'email' => 'maria@example.com', 'message' => '<b>Hola</b>',
        'campaign_id' => $campaign->id, 'sms_consent_at' => now(),
    ]);
    Lead::factory()->create(['full_name' => 'Old Lead', 'created_at' => now()->subYear()]);

    $response = $this->get(route('dashboard.leads.export'))->assertOk();

    expect($response->headers->get('content-disposition'))->toContain('leads-all.xlsx');

    $parts = xlsxParts($response->streamedContent());

    expect($parts['xl/workbook.xml'])->toContain('name="Leads"')
        ->and($parts['xl/sharedStrings.xml'])
        ->toContain('Maria Lopez', 'maria@example.com', 'Spring FHA', 'Old Lead', 'SMS consent')
        ->toContain('&lt;b&gt;Hola&lt;/b&gt;');
});

test('the lead export can be limited to a period', function () {
    Lead::factory()->create(['full_name' => 'Inside Range', 'created_at' => now()->subDays(5)]);
    Lead::factory()->create(['full_name' => 'Outside Range', 'created_at' => now()->subDays(40)]);

    $response = $this->get(route('dashboard.leads.export', [
        'from' => now()->subDays(10)->toDateString(),
        'to' => now()->toDateString(),
    ]))->assertOk();

    expect($response->headers->get('content-disposition'))->toContain('leads-'.now()->subDays(10)->toDateString().'_to_'.now()->toDateString().'.xlsx');

    $strings = xlsxParts($response->streamedContent())['xl/sharedStrings.xml'];

    expect($strings)->toContain('Inside Range')->not->toContain('Outside Range');
});

test('an export period needs both dates in order', function (array $query) {
    $this->get(route('dashboard.leads.export', $query))->assertSessionHasErrors();
    $this->get(route('dashboard.analytics.export', $query))->assertSessionHasErrors();
})->with([
    'only a start' => [['from' => '2026-01-01']],
    'only an end' => [['to' => '2026-01-01']],
    'end before start' => [['from' => '2026-02-01', 'to' => '2026-01-01']],
]);

test('analytics can be exported for everything recorded', function () {
    Visit::factory()->count(2)->create(['created_at' => now()->subDays(20)]);
    Visit::factory()->create();
    Lead::factory()->create();
    CtaClick::factory()->create(['label' => 'Apply Now']);

    $response = $this->get(route('dashboard.analytics.export'))->assertOk();

    expect($response->headers->get('content-disposition'))->toContain('analytics-all.xlsx');

    $parts = xlsxParts($response->streamedContent());

    expect($parts['xl/workbook.xml'])->toContain('name="Summary"', 'name="Daily"', 'name="Traffic sources"', 'name="Team members"');

    // The daily sheet reaches back to the first visit (20 days ago), so 21 days + the header row.
    expect(substr_count($parts['xl/worksheets/sheet2.xml'], '<row '))->toBe(22);
});

test('analytics can be exported for a specific period', function () {
    Visit::factory()->count(3)->create(['created_at' => now()->subDays(2)]);
    Visit::factory()->count(5)->create(['created_at' => now()->subDays(30)]);

    $response = $this->get(route('dashboard.analytics.export', [
        'from' => now()->subDays(4)->toDateString(),
        'to' => now()->toDateString(),
    ]))->assertOk();

    $parts = xlsxParts($response->streamedContent());

    // Summary: Page views is the 6th row (header, From, To, Days, Visitors, Page views).
    expect($parts['xl/worksheets/sheet1.xml'])->toContain('<v>3</v>')
        ->and(substr_count($parts['xl/worksheets/sheet2.xml'], '<row '))->toBe(6);
});
