<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JoinController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
* |--------------------------------------------------------------------------
* | Web Routes
* |--------------------------------------------------------------------------
* | Welcome | GUEST ROUTES
*/
Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us.index');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/loan-programs', [ProgramsController::class, 'index'])->name('programs.index');
Route::get('/our-team', [TeamController::class, 'index'])->name('our-team.index');
Route::get('/join-our-team', [JoinController::class, 'index'])->name('join-our-team.index');

Route::get('/mortgage', function () {
    return Inertia::render('Mortgage');
})->name('mortgage');

/*
* |--------------------------------------------------------------------------
* | Web Routes
* |--------------------------------------------------------------------------
* |Auth | dashboard
*/
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/auth-programs', [DashboardController::class, 'indexPrograms'])->name('auth-programs.index');
    Route::get('/auth-team', [DashboardController::class, 'indexTeam'])->name('auth-team.index');

});
