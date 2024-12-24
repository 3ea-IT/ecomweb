<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RegisterController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/UserLogin', [LoginController::class, 'UserLogin']);
// Route::post('/register', [RegisterController::class, 'register']); // Registration Route
Route::post('/add-to-cart', [CartController::class, 'addToCart']);

Route::post('/update-quantity/{productId}', [CartController::class, 'updateQuantityInDatabase']);
Route::post('/remove-item', [CartController::class, 'removeItem']);

Route::post('/orders', [OrderController::class, 'store']);

Route::get('/cart-items', [CartController::class, 'cartItems']);

Route::post('/check-code', [CartController::class, 'checkCode']);
