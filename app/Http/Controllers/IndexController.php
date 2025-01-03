<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{

    public function index()
    {
        // Define the specific product IDs you want to fetch
        $specificProductIds = [165, 135, 179, 50, 203, 30, 290, 231]; // Replace with your desired product IDs

        $data = Product::where('isaddon', '0')
            ->whereIn('product_id', $specificProductIds)
            ->get();

        $user = Auth::user();
        $countCart = $user ? Cart::where('user_id', $user->user_id)->count() : 0;

        return Inertia::render('Home', [
            'data' => $data,
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
