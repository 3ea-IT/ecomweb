<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function cartItems(Request $request)
    {
        $userId = $request->input('user_id');


         $countCart = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
                        ->where('carts.user_id', 11)
                        ->sum('cart_items.quantity');


        $CartList = DB::table('carts')
        ->join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
        ->join('products', 'cart_items.product_id', '=', 'products.product_id')
        ->leftJoin('tax_slabs', 'products.tax_slab_id', '=', 'tax_slabs.tax_slab_id') // Join tax slabs
        ->select(
            'carts.cart_id as cart_id',
            'cart_items.*',
            'products.product_id as product_id',
            'products.product_name as product_name',
            'products.product_description as product_description',
            'products.base_mrp as product_price',
            'products.main_image_url as product_image_url',
            'tax_slabs.gst as gst',
            DB::raw("(
                SELECT GROUP_CONCAT(product_name SEPARATOR ', ')
                FROM products
                WHERE FIND_IN_SET(
                    products.product_id,
                    REPLACE(REPLACE(REPLACE(cart_items.addon_ids, '\"', ''), '[', ''), ']', '')
                )
            ) AS addon_names")
        )
        ->where('carts.user_id', 11)
        ->get();

        return response()->json([
            'countCart' => $countCart,
            'CartList' => $CartList
        ]);
    }




    /**
     * Add a product (and optional add-ons) to the cart.
     */
    public function addToCart(Request $request)
    {
        try {
            // Validate the incoming data
            $validated = $request->validate([
                'product_id' => 'required|exists:products,product_id',
                'variation_id' => 'nullable|exists:variations,variation_id',
                'addon_ids' => 'nullable|array',
                'addon_ids.*' => 'required|exists:products,product_id',
                'quantity' => 'required|integer|min:1',
            ]);

            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated.'], 401);
            }

            // Ensure the product is not an add-on itself
            $product = Product::find($validated['product_id']);
            if ($product->isaddon) {
                return response()->json(['error' => 'Cannot add an add-on directly to the cart.'], 400);
            }

            // Fetch or create the user's cart
            $cart = $user->cart()->firstOrCreate([
                'user_id' => $user->user_id
            ]);

            // Determine unit_price and sale_price based on variation
            if (!empty($validated['variation_id'])) {
                $variation = $product->variations()->where('variation_id', $validated['variation_id'])->first();
                if (!$variation) {
                    return response()->json(['error' => 'Invalid variation selected.'], 400);
                }
                $unit_price = $variation->base_mrp;
                $sale_price = $variation->base_sp;
            } else {
                $unit_price = $product->base_mrp;
                $sale_price = $product->base_sale_price;
            }

            // Calculate total_addon_price
            $total_addon_price = 0.00;
            if (!empty($validated['addon_ids'])) {
                // Fetch add-ons based on addon_ids
                $addons = Product::whereIn('product_id', $validated['addon_ids'])->where('isaddon', 1)->get();
                foreach ($addons as $addon) {
                    $total_addon_price += $addon->base_sale_price;
                }
            }

            // Calculate total_price based on sale_price availability
            if (!is_null($sale_price)) {
                $total_price = ($sale_price * $validated['quantity']) + $total_addon_price;
            } else {
                $total_price = ($unit_price * $validated['quantity']) + $total_addon_price;
            }

            // Check if the product with the same variation already exists in the cart
            $cartItem = CartItem::where('cart_id', $cart->cart_id)
                ->where('product_id', $validated['product_id'])
                ->where('variation_id', $validated['variation_id'])
                ->first();

            if ($cartItem) {
                // Update quantity and prices
                $cartItem->quantity += $validated['quantity'];

                // Update unit_price and sale_price if applicable
                $cartItem->unit_price = $unit_price;
                $cartItem->sale_price = $sale_price;

                // Update total_addon_price
                $cartItem->total_addon_price += $total_addon_price;

                // Recalculate total_price based on the presence of sale_price
                if (!is_null($cartItem->sale_price)) {
                    $cartItem->total_price = ($cartItem->sale_price * $cartItem->quantity) + $cartItem->total_addon_price;
                } else {
                    $cartItem->total_price = ($cartItem->unit_price * $cartItem->quantity) + $cartItem->total_addon_price;
                }

                // Merge and deduplicate addon_ids
                if (!empty($validated['addon_ids'])) {
                    $existing_addons = $cartItem->addon_ids ?? [];
                    $merged_addons = array_unique(array_merge($existing_addons, $validated['addon_ids']));
                    $cartItem->addon_ids = $merged_addons;
                }

                $cartItem->save();
            } else {
                // Create new cart item
                $cartItem = CartItem::create([
                    'cart_id' => $cart->cart_id,
                    'product_id' => $validated['product_id'],
                    'quantity' => $validated['quantity'],
                    'unit_price' => $unit_price,
                    'sale_price' => $sale_price,
                    'total_addon_price' => $total_addon_price,
                    'total_price' => $total_price,
                    'variation_id' => $validated['variation_id'] ?? null,
                    'addon_ids' => $validated['addon_ids'] ?? [],
                ]);
            }

            return response()->json([
                'message' => 'Product added to cart successfully!',
                'cartItem' => $cartItem
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error adding to cart: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while adding the product to the cart.'], 500);
        }
    }

    /**
     * Fetch variations for a specific product.
     */
    public function getVariations($product_id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $product = Product::find($product_id);
        if (!$product || $product->isaddon) {
            return response()->json(['message' => 'Product not found or is an add-on.'], 404);
        }

        $variations = $product->variations()->where('is_active', 1)->get();
        return response()->json($variations, 200);
    }

    /**
     * Fetch add-ons for a specific product.
     */
    public function getAddons($product_id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $product = Product::find($product_id);
        if (!$product || $product->isaddon) {
            return response()->json(['message' => 'Product not found or is an add-on.'], 404);
        }

        // Fetch products where isaddon is 1
        $addons = Product::where('isaddon', 1)->where('is_active', 1)->get();
        return response()->json($addons, 200);
    }

    public function updateQuantityInDatabase(Request $request, $productId)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'action' => 'required|in:increase,decrease', // Validate action is present and valid
        ]);

        try {
            // Retrieve the cart item based on productId
            $cartItem = Cart::where('product_id', $productId)->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Item not found in cart'], 404);
            }

            // Update quantity based on the action
            if ($validated['action'] === 'increase') {
                $cartItem->qty += 1;
            } else if ($validated['action'] === 'decrease') {
                $cartItem->qty = max($cartItem->qty - 1, 0);
            }

            // Save the updated cart item
            $cartItem->save();

            // Return success response
            return response()->json(['message' => 'Quantity updated successfully', 'cartItem' => $cartItem]);
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }

    // Remove Cart Item
    public function removeCartItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
        ]);

        $cartItem = Cart::where('product_id', $validated['product_id'])->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed successfully']);
    }

        public function removeItem(Request $request)
        {
            try {
                // Find the cart item by its ID
                $cartItem = CartItem::where('cart_item_id', $request->cart_item_id)->first();

                // Check if the item exists
                if (!$cartItem) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Item not found in cart.',
                    ], 404);
                }

                // Delete the cart item
                $cartItem->delete();

                // Return success response
                return response()->json([
                    'success' => true,
                    'message' => 'Item removed successfully.',
                ]);
            } catch (\Exception $e) {
                // Catch and handle any unexpected errors
                return response()->json([
                    'success' => false,
                    'message' => 'Server error: ' . $e->getMessage(),
                ], 500);
            }
        }


        public function checkCode(Request $request)
        {

            try {
                // Query the database to check if the code exists
                $coupon = DB::table('coupons')->where('coupon_code', $request->code)->first();

                // Return response indicating if the code exists
                if ($coupon) {
                    return response()->json(['exists' => true, 'coupon' => $coupon]);
                } else {
                    return response()->json(['exists' => false], 404);
                }
            } catch (\Exception $e) {
                // Handle any unexpected errors
                return response()->json(['error' => 'An error occurred while checking the promo code.'], 500);
            }
        }







}
