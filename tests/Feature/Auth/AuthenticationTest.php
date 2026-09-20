<?php

use App\Models\User;
use Laravel\Socialite\Contracts\Provider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as GoogleUser;

function fakeGoogleUser(string $email, bool $verified = true): void
{
    $googleUser = (new GoogleUser)->map(['id' => '123', 'name' => 'Google Person', 'email' => $email]);
    $googleUser->user = ['email_verified' => $verified];

    $provider = Mockery::mock(Provider::class);
    $provider->shouldReceive('user')->andReturn($googleUser);

    Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
}

test('login screen can be rendered', function () {
    $this->get(route('login'))->assertOk();
});

test('there is no registration screen', function () {
    $this->get('/register')->assertNotFound();
});

test('an unknown email is rejected before google is contacted', function () {
    Socialite::shouldReceive('driver')->never();

    $this->post(route('google.redirect'), ['email' => 'stranger@example.com'])
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('an authorized email is sent on to google', function () {
    User::factory()->create(['email' => 'team@example.com']);

    $this->post(route('google.redirect'), ['email' => 'Team@Example.com'])
        ->assertRedirectContains('accounts.google.com');

    $this->assertGuest();
});

test('the google callback signs in the matching authorized user', function () {
    $user = User::factory()->unverified()->create(['email' => 'team@example.com']);
    fakeGoogleUser('team@example.com');

    $this->withSession(['google_login_email' => 'team@example.com'])
        ->get(route('google.callback'))
        ->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticatedAs($user);
    expect($user->fresh()->email_verified_at)->not->toBeNull();
});

test('the google callback rejects a different google account', function () {
    User::factory()->create(['email' => 'team@example.com']);
    User::factory()->create(['email' => 'other@example.com']);
    fakeGoogleUser('other@example.com');

    $this->withSession(['google_login_email' => 'team@example.com'])
        ->get(route('google.callback'))
        ->assertRedirect(route('login'));

    $this->assertGuest();
});

test('the google callback rejects an unverified google email', function () {
    User::factory()->create(['email' => 'team@example.com']);
    fakeGoogleUser('team@example.com', verified: false);

    $this->withSession(['google_login_email' => 'team@example.com'])
        ->get(route('google.callback'))
        ->assertRedirect(route('login'));

    $this->assertGuest();
});

test('the google callback requires the email step first', function () {
    User::factory()->create(['email' => 'team@example.com']);
    fakeGoogleUser('team@example.com');

    $this->get(route('google.callback'))->assertRedirect(route('login'));

    $this->assertGuest();
});

test('password login no longer works', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), ['email' => $user->email, 'password' => 'password']);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('logout'))->assertRedirect(route('home'));

    $this->assertGuest();
});
