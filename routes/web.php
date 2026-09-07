<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('programs', 'loan-programs')->name('programs');
Route::inertia('disclaimers', 'disclaimers')->name('disclaimers');
Route::inertia('privacy-policy', 'privacy-policy')->name('privacy-policy');
Route::inertia('terms-and-conditions', 'terms-and-conditions')->name('terms-and-conditions');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
