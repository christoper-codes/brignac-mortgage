<?php

use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\LeadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Guest/Welcome');
})->name('welcome');

Route::get('/about-us', function () {
    return Inertia::render('Guest/AboutUs');
})->name('about-us.index');

Route::get('/contact-us', [ContactUsController::class, 'index'])->name('contact-us.index');

Route::get('/loan-programs', function () {
    return Inertia::render('Guest/Programs');
})->name('programs.index');

Route::get('/our-team', function () {
    return Inertia::render('Guest/Team');
})->name('our-team.index');

/*
|--------------------------------------------------------------------------
| Legal Routes
|--------------------------------------------------------------------------
*/
Route::get('/privacy-policy-for-website', [LegalController::class, 'privacyPolicyForWebsite'])->name('privacy-policy-website');
Route::get('/disclaimers-for-website', [LegalController::class, 'disclaimersForWebsite'])->name('disclaimers-website');
Route::get('/terms-of-use-for-website', [LegalController::class, 'termsOfUseForWebsite'])->name('terms-of-use-website');

/*
|--------------------------------------------------------------------------
| Lead Generation
|--------------------------------------------------------------------------
*/
Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');
Route::post('/leads/event', [LeadController::class, 'trackEvent'])->name('leads.event');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/auth.php';
