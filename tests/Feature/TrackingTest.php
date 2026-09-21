<?php

use App\Models\Campaign;
use App\Models\CtaClick;
use App\Models\Visit;
use Illuminate\Support\Facades\Http;

const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/450.0]';

beforeEach(function () {
    Http::preventStrayRequests();
});

test('a visit is stored with device details and attributed to its campaign', function () {
    $campaign = Campaign::factory()->create(['code' => 'spring-fha']);

    $this->withHeader('User-Agent', IPHONE_UA)
        ->postJson(route('track.visit'), [
            'visitor_id' => 'visitor-1',
            'path' => '/',
            'referrer' => 'https://l.facebook.com/',
            'utm_source' => 'facebook',
            'utm_medium' => 'paid_social',
            'utm_campaign' => 'spring-fha',
        ])
        ->assertNoContent();

    $visit = Visit::query()->sole();

    expect($visit)
        ->campaign_id->toBe($campaign->id)
        ->visitor_id->toBe('visitor-1')
        ->device_type->toBe('mobile')
        ->browser->toBe('Facebook App')
        ->os->toBe('iOS')
        ->referrer_host->toBe('l.facebook.com');
});

test('an unknown campaign code is kept as utm data without a campaign', function () {
    $this->postJson(route('track.visit'), ['visitor_id' => 'v', 'path' => '/', 'utm_campaign' => 'nope'], ['User-Agent' => IPHONE_UA]);

    expect(Visit::query()->sole())->campaign_id->toBeNull()->utm_campaign->toBe('nope');
});

test('bots are not tracked', function () {
    $this->withHeader('User-Agent', 'Googlebot/2.1 (+http://www.google.com/bot.html)')
        ->postJson(route('track.visit'), ['visitor_id' => 'bot', 'path' => '/'])
        ->assertNoContent();

    expect(Visit::query()->count())->toBe(0);
});

test('a visit needs a visitor id and a path', function () {
    $this->postJson(route('track.visit'), [])->assertJsonValidationErrors(['visitor_id', 'path']);
});

test('a call to action click is stored', function () {
    $campaign = Campaign::factory()->create(['code' => 'summer']);

    $this->withHeader('User-Agent', IPHONE_UA)
        ->postJson(route('track.click'), [
            'visitor_id' => 'visitor-1',
            'label' => 'Get Pre-Qualified',
            'target' => '/apply',
            'path' => '/programs',
            'utm_campaign' => 'summer',
        ])
        ->assertNoContent();

    expect(CtaClick::query()->sole())
        ->campaign_id->toBe($campaign->id)
        ->label->toBe('Get Pre-Qualified')
        ->path->toBe('/programs');
});

test('the visitor location is resolved from the ip after the response', function () {
    Http::fake([
        'ip-api.com/*' => Http::response([
            'status' => 'success', 'countryCode' => 'US', 'region' => 'LA', 'regionName' => 'Louisiana', 'city' => 'Maurepas',
        ]),
    ]);

    $this->withHeader('User-Agent', IPHONE_UA)
        ->withServerVariables(['REMOTE_ADDR' => '8.8.8.8'])
        ->postJson(route('track.visit'), ['visitor_id' => 'v', 'path' => '/']);

    expect(Visit::query()->sole())
        ->ip_address->toBe('8.8.8.8')
        ->region_code->toBe('LA')
        ->region->toBe('Louisiana')
        ->city->toBe('Maurepas');
});

test('local addresses are never sent to the geolocation service', function () {
    $this->withHeader('User-Agent', IPHONE_UA)->postJson(route('track.visit'), ['visitor_id' => 'v', 'path' => '/']);

    Http::assertNothingSent();
    expect(Visit::query()->sole()->region_code)->toBeNull();
});

test('a click on a team member link remembers which member it was', function () {
    $this->withHeader('User-Agent', IPHONE_UA)
        ->postJson(route('track.click'), [
            'visitor_id' => 'v',
            'label' => 'Apply Now',
            'target' => 'https://2401214.my1003app.com',
            'team_member' => 'Shaun Brignac, MBA',
            'path' => '/apply',
        ])
        ->assertNoContent();

    expect(CtaClick::query()->sole())->team_member->toBe('Shaun Brignac, MBA');
});
