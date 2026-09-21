<?php

use App\Models\Campaign;
use App\Models\CtaClick;
use App\Models\Lead;
use App\Models\User;
use App\Models\Visit;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('guests cannot open any dashboard page', function (string $route) {
    auth()->logout();

    $this->get(route($route))->assertRedirect(route('login'));
})->with(['dashboard', 'dashboard.analytics', 'dashboard.leads.index', 'dashboard.campaigns.index']);

test('the overview counts distinct visitors, leads and clicks in the range', function () {
    Visit::factory()->count(3)->create(['visitor_id' => 'same']);
    Visit::factory()->create(['visitor_id' => 'other']);
    Visit::factory()->create(['visitor_id' => 'old', 'created_at' => now()->subDays(60)]);
    Lead::factory()->count(2)->create();
    CtaClick::factory()->create();

    $this->get(route('dashboard', ['range' => 30]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('days', 30)
            ->where('kpis.visitors.value', 2)
            ->where('kpis.leads.value', 2)
            ->where('kpis.clicks.value', 1)
            ->where('kpis.conversion.value', 100)
            ->has('series', 30)
            ->has('recentLeads', 2));
});

test('an unsupported range falls back to 30 days', function () {
    $this->get(route('dashboard', ['range' => 5]))->assertInertia(fn (Assert $page) => $page->where('days', 30));
});

test('the change against the previous period is reported', function () {
    Visit::factory()->count(2)->create(['created_at' => now()->subDays(40)]);
    Visit::factory()->count(4)->create();

    $this->get(route('dashboard', ['range' => 30]))
        ->assertInertia(fn (Assert $page) => $page->where('kpis.visitors.change', 100));
});

test('analytics reports states, sources, devices and the home state share', function () {
    Visit::factory()->count(3)->create(['region_code' => 'LA', 'region' => 'Louisiana', 'utm_source' => 'facebook']);
    Visit::factory()->create(['region_code' => 'TX', 'region' => 'Texas', 'utm_source' => null, 'referrer_host' => null]);
    Lead::factory()->create(['browser' => 'Safari', 'device_type' => 'mobile']);
    CtaClick::factory()->count(2)->create(['label' => 'Apply Now']);

    $this->get(route('dashboard.analytics'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/analytics')
            ->where('totals.visitors', 4)
            ->where('totals.pageViews', 4)
            ->where('states.rows.0.code', 'LA')
            ->where('states.rows.0.visitors', 3)
            ->where('states.homeShare', 75)
            ->where('sources.0.label', 'facebook')
            ->where('ctaLabels.0', ['label' => 'Apply Now', 'total' => 2])
            ->where('leadBrowsers.0.label', 'Safari')
            ->has('weekly', 12)
            ->has('monthly', 12));
});

test('the overview ranks campaigns by leads', function () {
    $winner = Campaign::factory()->create(['name' => 'Winner']);
    $other = Campaign::factory()->create(['name' => 'Other']);
    Lead::factory()->count(3)->create(['campaign_id' => $winner->id]);
    Lead::factory()->create(['campaign_id' => $other->id]);

    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->where('topCampaigns.0.name', 'Winner')
        ->where('topCampaigns.0.leads', 3));
});

test('analytics ranks team members by Apply Now clicks', function () {
    CtaClick::factory()->count(3)->create(['label' => 'Apply Now', 'team_member' => 'Shaun Brignac, MBA']);
    CtaClick::factory()->create(['label' => 'Shaun@brignacmortgage.com', 'team_member' => 'Shaun Brignac, MBA']);
    CtaClick::factory()->count(1)->create(['label' => 'Apply Now', 'team_member' => 'Allison Ratcliff']);
    CtaClick::factory()->create(['label' => 'Apply Now', 'team_member' => null]);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.analytics'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('teamMembers', [
                ['member' => 'Shaun Brignac, MBA', 'applies' => 3, 'total' => 4],
                ['member' => 'Allison Ratcliff', 'applies' => 1, 'total' => 1],
            ]));
});
