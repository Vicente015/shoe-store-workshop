<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\ProductListController::class, 'index']);
Route::post('/auth/login', [\App\Http\Controllers\AuthenticationController::class, 'login']);
Route::get('/auth/me', [\App\Http\Controllers\AuthenticationController::class, 'userInfo']);
Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'execute']);
