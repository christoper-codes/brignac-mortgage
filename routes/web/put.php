<?php

use App\Http\Controllers\AboutUsController;
use Illuminate\Support\Facades\Route;


/*
* |--------------------------------------------------------------------------
* | Web Routes
* |--------------------------------------------------------------------------
* |Auth | dashboard
*/
Route::middleware('auth')->group(function () {

    Route::put('/about-us/update', [AboutUsController::class, 'update'])->name('about-us.update');

});
