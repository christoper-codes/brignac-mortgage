<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('programs', 'loan-programs')->name('programs');
Route::inertia('apply', 'apply')->name('apply');
Route::inertia('testimonials', 'testimonials')->name('testimonials');
Route::inertia('disclaimers', 'disclaimers')->name('disclaimers');
Route::inertia('privacy-policy', 'privacy-policy')->name('privacy-policy');
Route::inertia('terms-and-conditions', 'terms-and-conditions')->name('terms-and-conditions');

Route::middleware('guest')->group(function () {
    Route::post('auth/google', [GoogleController::class, 'redirect'])->middleware('throttle:10,1')->name('google.redirect');
    Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
