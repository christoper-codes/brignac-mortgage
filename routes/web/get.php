<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\JoinController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Artisan;
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

Route::get('/migrate-fresh', function () {
    
    Artisan::call('migrate:fresh');
    
    return "migrate-fresh";
    
});

Route::get('/storage-fresh', function () {
    
    Artisan::call('storage:link');
    
    return "migrate-fresh";
    
});

Route::get('/optimize-fresh', function () {
    
    Artisan::call('optimize:clear');
    
    return "migrate-fresh";
    
});

/*
* |--------------------------------------------------------------------------
* | Web Routes
* |--------------------------------------------------------------------------
* |Auth | dashboard
*/
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/interested-clients', [DashboardController::class, 'indexInterestedClients'])->name('interested-clients.index');
    Route::get('/candidates-for-hiring', [DashboardController::class, 'indexCandidatesForHiring'])->name('candidates-for-hiring.index');

});
