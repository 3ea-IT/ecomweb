<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Session;
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




    public function addToCart(Request $request)
    {
        try {
            // Validate the incoming data
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id', // Ensure the product exists
            ]);

            // Get the currently authenticated user's ID
            // $userId = $request->userId;
            $userId = '1';

            if (!$userId) {
                return response()->json(['error' => 'User not authenticated.'], 401); // Handle unauthenticated users
            }

            // Fetch product from the database
            $product = DB::table('products')->find($validated['product_id']);
            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            // Check if the product already exists in the user's cart
            $cartItem = DB::table('carts')
                ->where('user_id', $userId)  // Check for the logged-in user's cart
                ->where('product_id', $validated['product_id'])
                ->first();

            if ($cartItem) {
                // If the product is already in the cart, update the quantity
                $updated = DB::table('carts')
                    ->where('id', $cartItem->id)
                    ->update([
                        'qty' => $cartItem->qty + 1 // Increment the quantity by 1
                    ]);

                if (!$updated) {
                    return response()->json(['error' => 'Failed to update quantity in cart.'], 500);
                }

                return response()->json([
                    'message' => 'Product quantity updated in cart!',
                ]);
            } else {
                // If the product doesn't exist in the cart, add it
                $inserted = DB::table('carts')->insert([
                    'user_id' => $userId,  // Use the logged-in user's ID
                    'product_id' => $validated['product_id'],
                    'qty' => 1,
                ]);

                if (!$inserted) {
                    return response()->json(['error' => 'Failed to add product to cart.'], 500);
                }

                return response()->json([
                    'message' => 'Product added to cart!',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error adding to cart: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while adding the product to the cart.'], 500);
        }
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
