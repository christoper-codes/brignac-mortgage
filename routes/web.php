<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Dashboard\AiController;
use App\Http\Controllers\Dashboard\AnalyticsController;
use App\Http\Controllers\Dashboard\AnalyticsExportController;
use App\Http\Controllers\Dashboard\CampaignController;
use App\Http\Controllers\Dashboard\LeadController as DashboardLeadController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\TrackingController as DashboardTrackingController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\LlmsController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('robots.txt', RobotsController::class)->name('robots');
Route::get('llms.txt', LlmsController::class)->name('llms');

Route::inertia('/', 'welcome')->name('home');
Route::inertia('programs', 'loan-programs')->name('programs');
Route::inertia('apply', 'apply')->name('apply');
Route::inertia('testimonials', 'testimonials')->name('testimonials');
Route::inertia('disclaimers', 'disclaimers')->name('disclaimers');
Route::inertia('privacy-policy', 'privacy-policy')->name('privacy-policy');
Route::inertia('terms-and-conditions', 'terms-and-conditions')->name('terms-and-conditions');

// Public tracking + lead capture (fed by the landing pages).
Route::post('track/visit', [TrackingController::class, 'visit'])->middleware('throttle:120,1')->name('track.visit');
Route::post('track/click', [TrackingController::class, 'click'])->middleware('throttle:120,1')->name('track.click');
// A real visitor submits this once; 10/minute was sized for generic abuse protection, not spam —
// tightened so a bot hammering the endpoint from one IP hits the wall fast while still leaving
// room for someone genuinely fixing a validation error and resubmitting a couple of times.
Route::post('leads', [LeadController::class, 'store'])->middleware('throttle:5,10')->name('leads.store');

Route::middleware('guest')->group(function () {
    Route::post('auth/google', [GoogleController::class, 'redirect'])->middleware('throttle:10,1')->name('google.redirect');
    Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', OverviewController::class)->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('analytics', AnalyticsController::class)->name('analytics');
        Route::get('analytics/export', AnalyticsExportController::class)->name('analytics.export');
        Route::get('ai', [AiController::class, 'index'])->name('ai');
        Route::get('users', [UserController::class, 'index'])->middleware('can:view-users')->name('users');
        Route::post('ai/plan', [AiController::class, 'plan'])->middleware('throttle:30,1')->name('ai.plan');
        Route::post('ai/answer', [AiController::class, 'answer'])->middleware('throttle:30,1')->name('ai.answer');
        Route::get('tracking', [DashboardTrackingController::class, 'edit'])->name('tracking.edit');
        Route::put('tracking', [DashboardTrackingController::class, 'update'])->name('tracking.update');
        Route::get('leads', [DashboardLeadController::class, 'index'])->name('leads.index');
        Route::get('leads/export', [DashboardLeadController::class, 'export'])->name('leads.export');
        Route::patch('leads/{lead}', [DashboardLeadController::class, 'update'])->name('leads.update');
        Route::delete('leads/{lead}', [DashboardLeadController::class, 'destroy'])->name('leads.destroy');
        Route::resource('campaigns', CampaignController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

// One-time production setup helpers, for hosts with no SSH/terminal access. Protected by a
// shared secret (DEPLOY_TOKEN in .env) passed as ?token=... — without this check, anyone who
// found the URL could run these with a plain GET request. See config/deploy.php for the token,
// and remove this whole block (plus that config file) once the site is live and set up.
Route::get('/deploy/{action}', function (string $action) {
    $token = (string) request()->query('token', '');
    $expected = (string) config('deploy.token');

    abort_unless($expected !== '' && hash_equals($expected, $token), 403);

    $commands = [
        // Safe to run again on a later deploy — only applies migrations not already run.
        'migrate' => fn () => Artisan::call('migrate', ['--force' => true]),
        // First-time setup only. Recreates every table from scratch — never run this again once
        // the site has real visitors, leads, or users in it.
        'migrate-fresh' => fn () => Artisan::call('migrate:fresh', ['--force' => true]),
        // The allowed dashboard logins — safe to re-run (firstOrCreate, won't duplicate).
        'seed' => fn () => Artisan::call('db:seed', ['--force' => true]),
        // The real historical leads carried over from the old site. Only needs to run once.
        'seed-legacy-leads' => fn () => Artisan::call('db:seed', ['--class' => 'LegacyLeadsSeeder', '--force' => true]),
        'storage-link' => fn () => Artisan::call('storage:link'),
        'optimize-clear' => fn () => Artisan::call('optimize:clear'),
    ];

    abort_unless(isset($commands[$action]), 404);

    $commands[$action]();

    return response(Artisan::output() ?: "{$action}: done")->header('Content-Type', 'text/plain');
})->name('deploy.run');

require __DIR__.'/settings.php';
