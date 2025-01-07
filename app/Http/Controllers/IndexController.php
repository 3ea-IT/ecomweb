<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{

    public function index()
    {
        $specificProductIds = [165, 135, 179, 50, 203, 30, 290, 231];

        $data = Product::where('isaddon', '0')
            ->whereIn('product_id', $specificProductIds)
            ->get();

        // Fetch featured reviews for homepage
        $reviews = Review::where(function ($query) {
            $query->where('display_section', 'home')
                ->orWhere('display_section', 'both');
        })
            ->where('is_featured', true)
            ->latest()
            ->take(5)
            ->get();

        $user = Auth::user();
        $countCart = $user ? Cart::where('user_id', $user->user_id)->count() : 0;

        return Inertia::render('Home', [
            'data' => $data,
            'reviews' => $reviews,
            'countCart' => $countCart
        ]);
    }

    public function showMenu()
    {
        // Fetch active categories with their products
        $categories = Category::where('is_active', 1)
            ->with(['products' => function ($query) {
                $query->where('is_active', 1)
                    ->where('isaddon', 0);
            }])
            ->get();

        return Inertia::render('Menu', [
            'categories' => $categories
        ]);
    }
}
