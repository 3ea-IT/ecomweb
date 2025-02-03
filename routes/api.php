<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ReservationController;
use App\Models\CartItem;
use App\Models\Cart;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/cart/add', [CartController::class, 'addToCart']);
    // Route::get('/check-out', [OrderController::class, 'index']);
});
Route::post('/update-quantity/{cart_item_id}', [CartController::class, 'updateQuantityInDatabase']);
Route::get('/products/{product}/variations', [CartController::class, 'getVariations']);
Route::get('/products/{product}/addons', [CartController::class, 'getAddons']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/remove-item', [CartController::class, 'removeItem']);
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

Route::get('/user-addresses', [AddressController::class, 'index']);
Route::post('/user-addresses', [AddressController::class, 'store']);
Route::get('/user-addresses/{id}', [AddressController::class, 'show']);
Route::put('/user-addresses/{id}', [AddressController::class, 'update']);
Route::delete('/user-addresses/{id}', [AddressController::class, 'destroy']);

Route::post('/remove-coupon', [CartController::class, 'removeCoupon']);
Route::get('/available-coupons', [CartController::class, 'getAvailableCoupons']);
