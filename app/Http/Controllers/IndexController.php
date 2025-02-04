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

    public function showMenu(Request $request)
    {
        $vegOnly = $request->input('vegOnly');

        $categoriesQuery = Category::where('is_active', 1)
            ->with([
                'products' => function ($query) use ($vegOnly) {
                    // Only fetch active, non-addon products
                    $query->where('is_active', 1)
                        ->where('isaddon', 0)
                        // Eager-load variations & addons
                        ->with(['variations', 'addons']);

                    // If requested, filter only Veg
                    if ($vegOnly) {
                        // If your `tag` column is a JSON array like ["Veg"], 
                        // you could do something like:
                        // $query->where('tag', 'LIKE', '%Veg%');
                        // or use MySQL JSON functions if properly stored as JSON
                        $query->where('tag', 'LIKE', '%Veg%');
                    }
                }
            ]);

        $categories = $categoriesQuery->get();

        return Inertia::render('Menu', [
            'categories' => $categories,
            // we can also pass 'vegOnly' back to the page if needed
            'vegOnly' => $vegOnly,
        ]);
    }
}
