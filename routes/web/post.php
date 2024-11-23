<?php

use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Route;

/*
* |--------------------------------------------------------------------------
* | Web Routes
* |--------------------------------------------------------------------------
* | EMAIL | GUEST ROUTES
*/
Route::post('/send-email', [EmailController::class, 'sendEmail'])->name('send-email');