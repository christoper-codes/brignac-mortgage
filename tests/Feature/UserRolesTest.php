<?php

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\AssertableInertia as Assert;

test('users are admins unless made owner', function () {
    expect(User::factory()->create()->role)->toBe(UserRole::Admin)
        ->and(User::factory()->owner()->create()->role)->toBe(UserRole::Owner)
        ->and(User::factory()->owner()->create()->isOwner())->toBeTrue()
        ->and(User::factory()->create()->isOwner())->toBeFalse();
});

test('the seeder makes christoper the owner and keeps that in step on re-runs', function () {
    $this->seed(DatabaseSeeder::class);

    expect(User::query()->where('email', 'christoper.patiho@gmail.com')->sole()->role)->toBe(UserRole::Owner);

    User::query()->where('email', 'christoper.patiho@gmail.com')->update(['role' => 'admin']);
    $this->seed(DatabaseSeeder::class);

    expect(User::query()->where('email', 'christoper.patiho@gmail.com')->sole()->role)->toBe(UserRole::Owner);
});

test('the role cannot be mass assigned', function () {
    $user = User::create(['name' => 'Sneaky', 'email' => 'sneaky@example.com', 'password' => 'password', 'role' => 'owner']);

    expect($user->fresh()->role)->toBe(UserRole::Admin);
});

test('signing in records when, how many times and from where', function () {
    $user = User::factory()->create();

    request()->server->set('REMOTE_ADDR', '203.0.113.7');
    Auth::login($user);

    expect($user->fresh())
        ->last_login_at->not->toBeNull()
        ->login_count->toBe(1)
        ->last_login_ip->toBe('203.0.113.7');
});

test('a second sign-in seconds later is the same visit, a later one counts', function () {
    $user = User::factory()->create();

    Auth::login($user);
    Auth::login($user->fresh());
    expect($user->fresh()->login_count)->toBe(1);

    $this->travel(10)->minutes();
    Auth::login($user->fresh());
    expect($user->fresh()->login_count)->toBe(2);
});

test('guests are sent to login from the users page', function () {
    $this->get(route('dashboard.users'))->assertRedirect(route('login'));
});

test('admins cannot open the users page', function () {
    $this->actingAs(User::factory()->create())->get(route('dashboard.users'))->assertForbidden();
});

test('the owner sees every user with their sign-in details, most recent first', function () {
    $owner = User::factory()->owner()->create(['name' => 'Owner Person', 'last_login_at' => now()->subMinutes(5), 'login_count' => 12, 'last_login_ip' => '203.0.113.9']);
    User::factory()->create(['name' => 'Recent Admin', 'last_login_at' => now()->subDays(2), 'login_count' => 3]);
    User::factory()->create(['name' => 'Never Admin', 'last_login_at' => null]);
    User::factory()->create(['name' => 'Old Admin', 'last_login_at' => now()->subDays(30), 'login_count' => 1]);

    $this->actingAs($owner)
        ->get(route('dashboard.users'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/users')
            ->has('users', 4)
            ->where('users.0.name', 'Owner Person')
            ->where('users.0.role', 'owner')
            ->where('users.0.is_you', true)
            ->where('users.0.login_count', 12)
            ->where('users.0.last_login_ip', '203.0.113.9')
            ->where('users.1.name', 'Recent Admin')
            ->where('users.1.is_you', false)
            ->where('users.2.name', 'Old Admin')
            ->where('users.3.name', 'Never Admin')
            ->where('users.3.last_login_at', null)
            ->where('summary.total', 4)
            ->where('summary.roles', [
                ['key' => 'owner', 'label' => 'Owners', 'count' => 1],
                ['key' => 'admin', 'label' => 'Admins', 'count' => 3],
            ])
            ->where('summary.activity', [
                ['key' => 'last_24_hours', 'label' => 'Last 24 hours', 'count' => 1],
                ['key' => 'this_week', 'label' => 'Earlier this week', 'count' => 1],
                ['key' => 'earlier', 'label' => 'Over a week ago', 'count' => 1],
                ['key' => 'never', 'label' => 'Never signed in', 'count' => 1],
            ]));
});

test('a request from someone whose session predates sign-in tracking records them as signed in', function () {
    $user = User::factory()->create(['last_login_at' => null, 'last_seen_at' => null]);

    $this->actingAs($user)->get(route('dashboard'))->assertOk();

    expect($user->fresh())
        ->last_seen_at->not->toBeNull()
        ->last_login_at->not->toBeNull()
        ->login_count->toBe(1);
});

test('last seen is refreshed at most every five minutes and never rewrites the sign-in', function () {
    $user = User::factory()->create(['last_login_at' => now()->subDay(), 'last_seen_at' => now()->subMinutes(2), 'login_count' => 4]);
    $seenBefore = $user->last_seen_at;

    $this->actingAs($user)->get(route('dashboard'))->assertOk();
    expect($user->fresh()->last_seen_at->equalTo($seenBefore))->toBeTrue();

    $this->travel(4)->minutes();
    $this->get(route('dashboard'))->assertOk();
    expect($user->fresh()->last_seen_at->greaterThan($seenBefore))->toBeTrue()
        ->and($user->fresh()->login_count)->toBe(4)
        ->and($user->fresh()->last_login_at->isYesterday())->toBeTrue();
});

test('the users page ranks and buckets people by their last activity', function () {
    $owner = User::factory()->owner()->create(['last_login_at' => now()->subDays(30), 'last_seen_at' => now()->subMinutes(1)]);

    $this->actingAs($owner)
        ->get(route('dashboard.users'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('users.0.is_you', true)
            ->where('summary.activity.0.count', 1)
            ->where('summary.activity.2.count', 0));
});

test('the shared auth user carries the role so the sidebar can show the users link', function () {
    $this->actingAs(User::factory()->owner()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->where('auth.user.role', 'owner'));

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->where('auth.user.role', 'admin'));
});
