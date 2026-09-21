<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Dashboard\AnalyticsController;
use App\Http\Controllers\Dashboard\CampaignController;
use App\Http\Controllers\Dashboard\LeadController as DashboardLeadController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\TrackingController as DashboardTrackingController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

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
Route::post('leads', [LeadController::class, 'store'])->middleware('throttle:10,1')->name('leads.store');

Route::middleware('guest')->group(function () {
    Route::post('auth/google', [GoogleController::class, 'redirect'])->middleware('throttle:10,1')->name('google.redirect');
    Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', OverviewController::class)->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('analytics', AnalyticsController::class)->name('analytics');
        Route::get('tracking', [DashboardTrackingController::class, 'edit'])->name('tracking.edit');
        Route::put('tracking', [DashboardTrackingController::class, 'update'])->name('tracking.update');
        Route::get('leads', [DashboardLeadController::class, 'index'])->name('leads.index');
        Route::patch('leads/{lead}', [DashboardLeadController::class, 'update'])->name('leads.update');
        Route::resource('campaigns', CampaignController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

require __DIR__.'/settings.php';
