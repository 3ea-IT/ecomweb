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
Route::inertia('/menu', 'Menu');
Route::inertia('/productDetail', 'ProductDetail');
Route::inertia('/blogs', 'Blog');
Route::inertia('/blogsDetail', 'BlogDetail');
Route::inertia('/outletsDetail', 'OutletsDetail');
Route::inertia('/contact', 'Contact');

// Define the GET route for displaying the registration form
Route::inertia('/register', 'Register')->name('register.page');

// Define the POST route for handling form submission
Route::post('/register', [RegisterController::class, 'register'])->name('register.submit');

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/ShopCart', [CartController::class, 'index']);
Route::get('/check-out', [OrderController::class, 'index']);

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
