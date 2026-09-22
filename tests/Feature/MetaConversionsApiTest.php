<?php

use App\Models\Campaign;
use App\Models\Lead;
use App\Models\TrackingSetting;
use App\Models\User;
use Illuminate\Support\Facades\Http;

const SAFARI_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1';

// Scoped to just the tests that expect an outgoing call: preventStrayRequests() would otherwise
// also block Inertia's own internal SSR request on the settings-page tests below.
function fakeMeta(int $status = 200): void
{
    Http::preventStrayRequests();
    Http::fake(['graph.facebook.com/*' => Http::response(['events_received' => 1], $status)]);
}

test('an Apply Now click sends a SubmitApplication event to the Conversions API', function () {
    fakeMeta();
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40)]);

    $this->withHeader('User-Agent', SAFARI_UA)->postJson(route('track.click'), [
        'visitor_id' => 'v', 'label' => 'Apply Now', 'target' => 'https://2401214.my1003app.com',
        'team_member' => 'Shaun Brignac, MBA', 'path' => '/apply', 'meta_event_id' => 'evt-1', 'fbp' => 'fb.1.111', 'fbc' => 'fb.1.222',
    ]);

    Http::assertSent(function ($request) {
        $event = $request->data()['data'][0];

        return $request->url() === 'https://graph.facebook.com/v21.0/123456789012345/events'
            && $event['event_name'] === 'SubmitApplication'
            && $event['event_id'] === 'evt-1'
            && $event['custom_data']['content_name'] === 'Shaun Brignac, MBA'
            && $event['user_data']['fbp'] === 'fb.1.111'
            && $event['user_data']['fbc'] === 'fb.1.222';
    });
});

test('a click that is not Apply Now does not call the Conversions API', function () {
    fakeMeta();
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40)]);

    $this->withHeader('User-Agent', SAFARI_UA)->postJson(route('track.click'), [
        'visitor_id' => 'v', 'label' => 'Call', 'target' => 'tel:+15045592821', 'path' => '/apply',
    ]);

    Http::assertNothingSent();
});

test('an Apply Now click without a Conversions API token does not call Meta', function () {
    fakeMeta();
    TrackingSetting::store(['meta_pixel_id' => '123456789012345']);

    $this->withHeader('User-Agent', SAFARI_UA)->postJson(route('track.click'), [
        'visitor_id' => 'v', 'label' => 'Apply Now', 'team_member' => 'Allison Ratcliff', 'path' => '/apply',
    ]);

    Http::assertNothingSent();
});

test('a lead sends a hashed Lead event to the Conversions API', function () {
    fakeMeta();
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40)]);
    Campaign::factory()->create(['code' => 'demo']);

    $this->post(route('leads.store'), [
        'full_name' => 'Jane Doe', 'email' => 'Jane@Example.com', 'phone' => '(504) 555-0123',
        'sms_consent' => true, 'utm_campaign' => 'demo', 'meta_event_id' => 'evt-lead', 'fbp' => 'fb.1.333',
    ]);

    Http::assertSent(function ($request) {
        $event = $request->data()['data'][0];

        return $event['event_name'] === 'Lead'
            && $event['event_id'] === 'evt-lead'
            && $event['user_data']['em'] === hash('sha256', 'jane@example.com')
            && $event['user_data']['ph'] === hash('sha256', '5045550123');
    });
});

test('the test event code is included while set', function () {
    fakeMeta();
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40), 'meta_test_event_code' => 'TEST123']);

    $this->post(route('leads.store'), ['full_name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '5045550123', 'sms_consent' => true]);

    Http::assertSent(fn ($request) => ($request->data()['test_event_code'] ?? null) === 'TEST123');
});

test('a failed Meta call never breaks the visitor-facing request', function () {
    fakeMeta(status: 400);
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40)]);

    $this->post(route('leads.store'), ['full_name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '5045550123', 'sms_consent' => true])
        ->assertSessionHasNoErrors();

    expect(Lead::query()->count())->toBe(1);
});

test('the settings page never exposes the saved token', function () {
    TrackingSetting::store(['meta_capi_token' => 'super-secret-token-value-1234567890']);

    $response = $this->actingAs(User::factory()->create())->get(route('dashboard.tracking.edit'));

    $response->assertInertia(fn ($page) => $page->where('settings.metaCapiTokenPreview', '••••7890'));
    $response->assertDontSee('super-secret-token-value-1234567890');
});

test('leaving the token field blank on save keeps the existing token', function () {
    TrackingSetting::store(['meta_pixel_id' => '123456789012345', 'meta_capi_token' => str_repeat('a', 40)]);

    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tracking.update'), ['google_analytics_id' => 'G-ABC1234567']);

    expect(TrackingSetting::metaCapiToken())->toBe(str_repeat('a', 40));
});

test('the clear checkbox removes the token', function () {
    TrackingSetting::store(['meta_capi_token' => str_repeat('a', 40)]);

    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tracking.update'), ['clear_meta_capi_token' => true]);

    expect(TrackingSetting::metaCapiToken())->toBeNull();
});

test('a short value is rejected as not a real token', function () {
    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tracking.update'), ['meta_capi_token' => 'tooshort'])
        ->assertSessionHasErrors('meta_capi_token');
});
