<?php

use App\Enums\CampaignPlatform;
use App\Enums\CampaignStatus;
use App\Enums\LeadStatus;
use App\Models\Campaign;
use App\Models\Lead;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('the campaign list shows counts and the tracking url', function () {
    $campaign = Campaign::factory()->create(['code' => 'spring', 'platform' => CampaignPlatform::Instagram, 'budget_cents' => 50000]);
    Lead::factory()->count(2)->create(['campaign_id' => $campaign->id]);

    $this->get(route('dashboard.campaigns.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/campaigns')
            ->where('campaigns.0.leads_count', 2)
            ->where('campaigns.0.budget', 500)
            ->where('campaigns.0.cost_per_lead', 250)
            ->where('campaigns.0.tracking_url', rtrim(url('/'), '/').'/?utm_source=instagram&utm_medium=paid_social&utm_campaign=spring')
            ->has('platforms', 3));
});

test('a campaign can be created and gets a unique code from its name', function () {
    $payload = ['name' => 'Spring FHA', 'platform' => 'facebook', 'status' => 'active', 'budget' => '1250.50'];

    $this->post(route('dashboard.campaigns.store'), $payload)->assertRedirect();
    $this->post(route('dashboard.campaigns.store'), $payload)->assertRedirect();

    expect(Campaign::query()->orderBy('id')->pluck('code')->all())->toBe(['spring-fha', 'spring-fha-2']);
    expect(Campaign::query()->first())
        ->budget_cents->toBe(125050)
        ->platform->toBe(CampaignPlatform::Facebook)
        ->status->toBe(CampaignStatus::Active);
});

test('a campaign needs a name, platform and status', function () {
    $this->post(route('dashboard.campaigns.store'), [])->assertSessionHasErrors(['name', 'platform', 'status']);
});

test('a campaign code must be unique', function () {
    Campaign::factory()->create(['code' => 'taken']);

    $this->post(route('dashboard.campaigns.store'), ['name' => 'X', 'code' => 'taken', 'platform' => 'tiktok', 'status' => 'draft'])
        ->assertSessionHasErrors('code');
});

test('a campaign can be updated keeping its own code', function () {
    $campaign = Campaign::factory()->create(['code' => 'keep-me']);

    $this->put(route('dashboard.campaigns.update', $campaign), [
        'name' => 'Renamed', 'code' => 'keep-me', 'platform' => 'tiktok', 'status' => 'paused', 'pixel_id' => '12345',
    ])->assertSessionHasNoErrors();

    expect($campaign->fresh())->name->toBe('Renamed')->status->toBe(CampaignStatus::Paused)->pixel_id->toBe('12345');
});

test('deleting a campaign keeps its leads', function () {
    $campaign = Campaign::factory()->create();
    $lead = Lead::factory()->create(['campaign_id' => $campaign->id]);

    $this->delete(route('dashboard.campaigns.destroy', $campaign))->assertRedirect();

    expect(Campaign::query()->count())->toBe(0);
    expect($lead->fresh()->campaign_id)->toBeNull();
});

test('leads can be filtered and their status updated', function () {
    $campaign = Campaign::factory()->create();
    $match = Lead::factory()->create(['campaign_id' => $campaign->id, 'full_name' => 'Maria Lopez', 'region_code' => 'TX']);
    Lead::factory()->create(['full_name' => 'Someone Else']);

    $this->get(route('dashboard.leads.index', ['q' => 'maria', 'campaign' => $campaign->id, 'state' => 'TX']))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/leads')
            ->has('leads.data', 1)
            ->where('leads.data.0.full_name', 'Maria Lopez'));

    $this->patch(route('dashboard.leads.update', $match), ['status' => 'qualified'])->assertRedirect();

    expect($match->fresh()->status)->toBe(LeadStatus::Qualified);
});

test('a lead status must be valid', function () {
    $lead = Lead::factory()->create();

    $this->patch(route('dashboard.leads.update', $lead), ['status' => 'bogus'])->assertSessionHasErrors('status');
});
