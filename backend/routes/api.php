<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\ProductListController::class, 'index']);
Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'execute']);

