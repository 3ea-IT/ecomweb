<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;

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

// Define the GET route for displaying the registration form
Route::inertia('/register', 'Register')->name('register.page');

// Define the POST route for handling form submission
Route::post('/register', [RegisterController::class, 'register'])->name('register.submit');

Route::post('/contact', [ContactController::class, 'store']);

// Add this with your other web routes
// Change the route to match the component path exactly
Route::get('/check-out', [OrderController::class, 'index'])
  ->middleware('auth:sanctum')
  ->name('checkout');

Route::get('/orders/{orderId}', [OrderController::class, 'show'])
  ->middleware('auth:sanctum')
  ->name('orders.show');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
