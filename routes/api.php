<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-quantity/{productId}', [CartController::class, 'updateQuantityInDatabase']);
    Route::post('/remove-item', [CartController::class, 'removeItem']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/products/{product}/variations', [CartController::class, 'getVariations']);
    Route::get('/products/{product}/addons', [CartController::class, 'getAddons']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/products', [ProductController::class, 'index']);

    // Route to fetch a specific product by its ID
    Route::get('/products/{id}', [ProductController::class, 'show']);

    Route::get('/cart-items', [CartController::class, 'cartItems']);

    Route::post('/check-code', [CartController::class, 'checkCode']);
});

Route::post('/UserLogin', [LoginController::class, 'UserLogin']);
