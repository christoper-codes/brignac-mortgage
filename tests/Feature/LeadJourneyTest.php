<?php

use App\Models\CtaClick;
use App\Models\Lead;
use App\Models\User;
use App\Models\Visit;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('a lead journey lists the visitor\'s page views and clicks in order, up to their submission', function () {
    $visitorId = 'visitor-1';
    $lead = Lead::factory()->create(['visitor_id' => $visitorId, 'created_at' => now()]);

    Visit::factory()->create(['visitor_id' => $visitorId, 'path' => '/', 'created_at' => now()->subMinutes(10)]);
    CtaClick::factory()->create(['visitor_id' => $visitorId, 'label' => 'Get Pre-Qualified', 'path' => '/', 'created_at' => now()->subMinutes(9)]);
    Visit::factory()->create(['visitor_id' => $visitorId, 'path' => '/apply', 'created_at' => now()->subMinutes(8)]);
    CtaClick::factory()->create(['visitor_id' => $visitorId, 'label' => 'Apply Now', 'team_member' => 'Shaun Brignac, MBA', 'path' => '/apply', 'created_at' => now()->subMinutes(1)]);

    $this->get(route('dashboard.leads.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/leads')
            ->has("journeys.{$lead->id}", 4)
            ->where("journeys.{$lead->id}.0.path", '/')
            ->where("journeys.{$lead->id}.1.label", 'Get Pre-Qualified')
            ->where("journeys.{$lead->id}.3.label", 'Apply Now')
            ->where("journeys.{$lead->id}.3.team_member", 'Shaun Brignac, MBA'));
});

test('a journey never includes activity from after that lead was submitted', function () {
    $visitorId = 'visitor-2';
    $lead = Lead::factory()->create(['visitor_id' => $visitorId, 'created_at' => now()]);

    // Browsing that happens after the form was already submitted belongs to a separate, later
    // story — it must not appear as if it happened "before" the conversion.
    Visit::factory()->create(['visitor_id' => $visitorId, 'path' => '/testimonials', 'created_at' => now()->addMinutes(5)]);

    $this->get(route('dashboard.leads.index'))
        ->assertInertia(fn (Assert $page) => $page->has("journeys.{$lead->id}", 0));
});

test('a repeat visitor\'s second lead does not replay the first lead\'s already-told journey', function () {
    $visitorId = 'visitor-3';

    $firstLead = Lead::factory()->create(['visitor_id' => $visitorId, 'created_at' => now()->subHour()]);
    Visit::factory()->create(['visitor_id' => $visitorId, 'path' => '/', 'created_at' => now()->subHour()->subMinutes(5)]);

    $secondLead = Lead::factory()->create(['visitor_id' => $visitorId, 'created_at' => now()]);
    Visit::factory()->create(['visitor_id' => $visitorId, 'path' => '/apply', 'created_at' => now()->subMinutes(2)]);

    $this->get(route('dashboard.leads.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->has("journeys.{$firstLead->id}", 1)
            ->has("journeys.{$secondLead->id}", 1)
            ->where("journeys.{$secondLead->id}.0.path", '/apply'));
});
