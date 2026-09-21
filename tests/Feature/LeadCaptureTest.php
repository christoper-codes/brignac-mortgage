<?php

use App\Enums\LeadStatus;
use App\Models\Campaign;
use App\Models\Lead;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    Http::preventStrayRequests();
});

function leadPayload(array $overrides = []): array
{
    return [
        'full_name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '(504) 555-0123',
        'message' => 'I want to refinance.',
        'sms_consent' => true,
        'visitor_id' => 'visitor-9',
        ...$overrides,
    ];
}

test('a lead is stored with its campaign, consent and origin', function () {
    $campaign = Campaign::factory()->create(['code' => 'tiktok-jumbo']);

    $this->from('/apply')
        ->post(route('leads.store'), leadPayload([
            'utm_source' => 'tiktok',
            'utm_campaign' => 'tiktok-jumbo',
            'landing_path' => '/programs',
        ]))
        ->assertRedirect('/apply')
        ->assertSessionHas('status', 'lead-created');

    expect(Lead::query()->sole())
        ->full_name->toBe('Jane Doe')
        ->email->toBe('jane@example.com')
        ->campaign_id->toBe($campaign->id)
        ->status->toBe(LeadStatus::New)
        ->utm_source->toBe('tiktok')
        ->landing_path->toBe('/programs')
        ->ip_address->toBe('127.0.0.1')
        ->sms_consent_at->not->toBeNull();
});

test('a lead without consent is rejected', function () {
    $this->post(route('leads.store'), leadPayload(['sms_consent' => false]))
        ->assertSessionHasErrors('sms_consent');

    expect(Lead::query()->count())->toBe(0);
});

test('a lead needs a valid email and phone', function () {
    $this->post(route('leads.store'), leadPayload(['email' => 'not-an-email', 'phone' => 'abc']))
        ->assertSessionHasErrors(['email', 'phone']);
});

test('a lead does not need a campaign', function () {
    $this->post(route('leads.store'), leadPayload());

    expect(Lead::query()->sole()->campaign_id)->toBeNull();
});
