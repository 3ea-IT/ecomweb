<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Models\CartItem;
use App\Models\Cart;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-quantity/{productId}', [CartController::class, 'updateQuantityInDatabase']);
    Route::post('/remove-item', [CartController::class, 'removeItem']);
    Route::get('/products/{product}/variations', [CartController::class, 'getVariations']);
    Route::get('/products/{product}/addons', [CartController::class, 'getAddons']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    Route::get('/check-out', [OrderController::class, 'index']);
});
Route::post('/apply-coupon', [CartController::class, 'applyCoupon']);
Route::get(uri: '/cart-items', action: [CartController::class, 'cartItems']);

Route::get('/order-items', [OrderController::class, 'OrderItems']);
Route::get('/cart-count/{userId}', function ($userId) {
    $cart = Cart::where('user_id', $userId)->first();
    if ($cart) {
        $count = CartItem::where('cart_id', $cart->cart_id)->sum('quantity');
        return response()->json(['count' => $count]);
    }

    return response()->json(['count' => 0]);
});

Route::post('/orders', [OrderController::class, 'store']);
Route::post('/UserLogin', [LoginController::class, 'UserLogin']);
Route::post('/create-razorpay-order', [OrderController::class, 'createRazorpayOrder']);
Route::post('/confirm-payment', [OrderController::class, 'confirmPayment']);
Route::get('/cart-COUNT', [CartController::class, 'cartCOUNT']);
