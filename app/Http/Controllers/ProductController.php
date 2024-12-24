<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of active main products with their variations and add-ons.
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        // Fetch all active main products (isaddon = 0) with their active variations and add-ons
        $products = Product::where('is_active', 1)
            ->where('isaddon', 0) // Only main products
            ->with([
                'variations' => function ($query) {
                    $query->where('is_active', 1);
                },
                'addons'
            ])
            ->get();

        return response()->json([
            'data' => $products
        ], 200);
    }

    /**
     * Display the specified product with its variations and add-ons.
     */
    public function show($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        // Fetch the active main product with its active variations and add-ons
        $product = Product::where('is_active', 1)
            ->where('isaddon', 0) // Ensure it's a main product
            ->where('product_id', $id)
            ->with([
                'variations' => function ($query) {
                    $query->where('is_active', 1);
                },
                'addons'
            ])
            ->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        return response()->json([
            'data' => $product
        ], 200);
    }
}
