<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BlogController;

Route::get('/', [IndexController::class, 'index'])->name('home');

Route::inertia('/about', 'About');
Route::inertia('/outlets', 'Outlets');
Route::get('/menu', [IndexController::class, 'showMenu'])->name('menu');
Route::inertia('/productDetail', 'ProductDetail');
Route::inertia('/blogs', 'Blog');
Route::inertia('/blogsDetail', 'BlogDetail');
Route::inertia('/outletsDetail', 'OutletsDetail');
Route::inertia('/contact', 'Contact');
Route::inertia('/ShopCart', 'Cart.CartDetail');
Route::inertia('/OrderHistory', 'Order.OrderHistory');
Route::inertia('/privacy-policy', 'FooterComp/PrivacyPolicy');
Route::inertia('/terms-of-use', 'FooterComp/TermsofUse');
Route::inertia('/refund-policy', 'FooterComp/RefundPolicy');

Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register'])->name('register.post');

Route::post('/contact', [ContactController::class, 'store']);

// Add this with your other web routes
// Change the route to match the component path exactly
Route::get('/check-out', [OrderController::class, 'index'])
  ->middleware('auth:sanctum')
  ->name('checkout');

Route::get('/orders/{orderId}', [OrderController::class, 'show'])
  ->middleware('auth:sanctum')
  ->name('orders.show');

Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews');
Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations');
Route::post('/reservations', [ReservationController::class, 'store'])
  ->name('reservations.store');

Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blogs/{blog:slug}', [BlogController::class, 'show'])->name('blogs.show');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
