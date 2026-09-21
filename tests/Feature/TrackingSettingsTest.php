<?php

use App\Models\TrackingSetting;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot open or change the pixel settings', function () {
    $this->get(route('dashboard.tracking.edit'))->assertRedirect(route('login'));
    $this->put(route('dashboard.tracking.update'), [])->assertRedirect(route('login'));
});

test('the pixel settings page shows the saved ids', function () {
    TrackingSetting::store(['meta_pixel_id' => '123456789012345']);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.tracking.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/tracking')
            ->where('settings.metaPixelId', '123456789012345')
            ->where('settings.tiktokPixelId', null));
});

test('the ids are saved normalised and reach the public pages', function () {
    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tracking.update'), [
            'meta_pixel_id' => '123456789012345',
            'tiktok_pixel_id' => ' c1a2b3c4d5e6f7g8h9 ',
            'google_analytics_id' => 'g-abc123xyz9',
        ])
        ->assertSessionHasNoErrors();

    expect(TrackingSetting::shared())->toBe([
        'metaPixelId' => '123456789012345',
        'tiktokPixelId' => 'C1A2B3C4D5E6F7G8H9',
        'googleAnalyticsId' => 'G-ABC123XYZ9',
    ]);

    auth()->logout();

    $this->get('/')
        ->assertOk()
        ->assertSee('window.__tracking', false)
        ->assertSee('123456789012345', false)
        ->assertSee('G-ABC123XYZ9', false);
});

test('saving again updates the same row and refreshes what pages see', function () {
    $this->actingAs(User::factory()->create());

    $this->put(route('dashboard.tracking.update'), ['meta_pixel_id' => '111111111']);
    $this->put(route('dashboard.tracking.update'), ['meta_pixel_id' => '222222222']);

    expect(TrackingSetting::query()->count())->toBe(1);
    expect(TrackingSetting::shared()['metaPixelId'])->toBe('222222222');
});

test('empty fields switch a platform off', function () {
    $this->actingAs(User::factory()->create());
    TrackingSetting::store(['meta_pixel_id' => '123456789012345']);

    $this->put(route('dashboard.tracking.update'), ['meta_pixel_id' => '', 'tiktok_pixel_id' => null, 'google_analytics_id' => '']);

    expect(TrackingSetting::shared())->toBe(['metaPixelId' => null, 'tiktokPixelId' => null, 'googleAnalyticsId' => null]);
});

test('ids that are not in a platform format are rejected', function (string $field, string $value) {
    $this->actingAs(User::factory()->create())
        ->put(route('dashboard.tracking.update'), [$field => $value])
        ->assertSessionHasErrors($field);

    expect(TrackingSetting::query()->count())->toBe(0);
})->with([
    'meta with a script' => ['meta_pixel_id', "1');alert(1);//"],
    'meta too short' => ['meta_pixel_id', '123'],
    'tiktok with quotes' => ['tiktok_pixel_id', "ABC'DEF"],
    'google without prefix' => ['google_analytics_id', 'UA-1234567'],
]);
