<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;


Route::get('/', [IndexController::class, 'index']);
Route::inertia('/about', 'About');
Route::inertia('/outlets', 'Outlets');
Route::inertia('/menu', 'Menu');
Route::inertia('/productDetail', 'ProductDetail');
Route::inertia('/blogs', 'Blog');
Route::inertia('/blogsDetail', 'BlogDetail');
Route::inertia('/outletsDetail', 'OutletsDetail');
Route::inertia('/contact', 'Contact');
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/ShopCart', [CartController::class, 'index']);
Route::get('/check-out', [OrderController::class, 'index']);



