<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Coupon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function cartItems(Request $request)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        $countCart = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->where('carts.user_id', $userId)
            ->sum('cart_items.quantity');

        $CartList = DB::table('carts')
            ->join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->join('products', 'cart_items.product_id', '=', 'products.product_id')
            ->leftJoin('variations', 'cart_items.variation_id', '=', 'variations.variation_id')
            ->leftJoin('tax_slabs', 'products.tax_slab_id', '=', 'tax_slabs.tax_slab_id')
            ->leftJoin('coupons', 'cart_items.applied_coupon_id', '=', 'coupons.coupon_id')
            ->select(
                'carts.cart_id as cart_id',
                'cart_items.cart_item_id',
                'cart_items.product_id',
                'cart_items.quantity',
                'cart_items.unit_price',
                'cart_items.sale_price',
                'cart_items.total_addon_price',
                'cart_items.total_price',
                'cart_items.addon_ids',
                'products.product_name',
                'products.product_description',
                'products.base_mrp as product_price',
                'products.main_image_url as product_image_url',
                'tax_slabs.gst as gst',
                'coupons.discount_value as cou_discount_value',
                'coupons.coupon_code as coupon_code',
                'variations.variation_name',
            )
            ->where('carts.user_id', $userId)
            ->get();

        // Multiply addon price by quantity for each item
        // For each $item, fetch detailed add-on data
        foreach ($CartList as $item) {
            // Convert JSON to array
            $addonIDs = json_decode($item->addon_ids, true) ?: [];
            $addonDetails = [];

            if (!empty($addonIDs)) {
                $addons = DB::table('products')
                    ->whereIn('product_id', $addonIDs)
                    ->select('product_id', 'product_name', 'base_sale_price')
                    ->get();

                foreach ($addons as $addon) {
                    $addonDetails[] = [
                        'addon_id' => $addon->product_id,
                        'name' => $addon->product_name,
                        'price' => $addon->base_sale_price,
                    ];
                }
            }

            // Return them as an array
            $item->addon_details = $addonDetails;
        }

        return response()->json([
            'countCart' => $countCart,
            'CartList' => $CartList
        ]);
    }

    public function addToCart(Request $request)
    {
        try {
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
            $variationId = $validated['variation_id'] ?? null;
            if ($variationId) {
                $variation = $product->variations()->where('variation_id', $variationId)->first();
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
            $addon_ids = $validated['addon_ids'] ?? [];
            sort($addon_ids); // Sort addon_ids for consistent comparison

            if (!empty($addon_ids)) {
                // Fetch add-ons based on addon_ids
                $addons = Product::whereIn('product_id', $addon_ids)
                    ->where('isaddon', 1)
                    ->get();
                foreach ($addons as $addon) {
                    $total_addon_price += $addon->base_sale_price;
                }
            }

            // Calculate total_price
            $base_price = !is_null($sale_price) ? $sale_price : $unit_price;
            $total_price = ($base_price * $validated['quantity']) + ($total_addon_price * $validated['quantity']);

            // Check if the exact same product configuration exists in the cart
            $cartItem = CartItem::where('cart_id', $cart->cart_id)
                ->where('product_id', $validated['product_id'])
                ->where('variation_id', $variationId)
                ->where(function ($query) use ($addon_ids) {
                    if (empty($addon_ids)) {
                        $query->whereNull('addon_ids')
                            ->orWhere('addon_ids', '[]');
                    } else {
                        // Convert stored JSON addon_ids to PHP array and compare
                        $query->whereRaw('JSON_CONTAINS(addon_ids, ?)', [json_encode($addon_ids)])
                            ->whereRaw('JSON_LENGTH(addon_ids) = ?', [count($addon_ids)]);
                    }
                })
                ->first();

            if ($cartItem) {
                // Update quantity and recalculate prices for existing item
                $cartItem->quantity += $validated['quantity'];
                $cartItem->total_price = ($base_price * $cartItem->quantity) +
                    ($total_addon_price * $cartItem->quantity);
                $cartItem->save();
            } else {
                // Create new cart item for different configuration
                $cartItem = CartItem::create([
                    'cart_id' => $cart->cart_id,
                    'product_id' => $validated['product_id'],
                    'quantity' => $validated['quantity'],
                    'unit_price' => $unit_price,
                    'sale_price' => $sale_price,
                    'total_addon_price' => $total_addon_price,
                    'total_price' => $total_price,
                    'variation_id' => $variationId,
                    'addon_ids' => $addon_ids,
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

    public function updateQuantityInDatabase(Request $request, $cartItemId)
    {
        $validated = $request->validate([
            'action' => 'required|in:increase,decrease,set',
            'quantity' => 'integer|min:1|nullable',
        ]);

        try {
            $cartItem = CartItem::find($cartItemId);
            if (!$cartItem) {
                return response()->json(['message' => 'Item not found in cart'], 404);
            }

            if ($validated['action'] === 'increase') {
                $cartItem->quantity++;
            } elseif ($validated['action'] === 'decrease') {
                $cartItem->quantity = max($cartItem->quantity - 1, 1);
            } elseif ($validated['action'] === 'set' && isset($validated['quantity'])) {
                $cartItem->quantity = $validated['quantity'];
            }

            // Recalc total
            $basePrice = $cartItem->sale_price ?? $cartItem->unit_price;
            $cartItem->total_price =
                ($basePrice * $cartItem->quantity) +
                ($cartItem->total_addon_price * $cartItem->quantity);

            $cartItem->save();

            return response()->json([
                'message' => 'Quantity updated successfully',
                'cartItem' => $cartItem
            ]);
        } catch (\Exception $e) {
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
        // Validate the incoming request
        $validated = $request->validate([
            'cart_item_id' => 'required|integer',
        ]);

        try {
            // Find the cart item by its ID
            $cartItem = CartItem::find($validated['cart_item_id']);

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

    public function applyCoupon(Request $request)
    {
        $validated = $request->validate([
            'coupon_code' => 'required',
            'user_id' => 'required'
        ]);

        $userId = $validated['user_id'];
        $couponCode = $validated['coupon_code'];

        // Get cart details
        $cart = Cart::where('user_id', $userId)->first();
        if (!$cart) {
            return response()->json(['success' => false, 'message' => 'Cart not found']);
        }

        // Get coupon details
        $coupon = Coupon::where('coupon_code', $couponCode)
            ->where('is_active', 1)
            ->first();

        if (!$coupon) {
            return response()->json(['success' => false, 'message' => 'Invalid coupon code']);
        }

        // Validate coupon
        $cartTotal = CartItem::where('cart_id', $cart->cart_id)
            ->sum(DB::raw('quantity * COALESCE(sale_price, unit_price)'));

        // Check minimum purchase amount
        if ($coupon->minimum_purchase_amount && $cartTotal < $coupon->minimum_purchase_amount) {
            return response()->json([
                'success' => false,
                'message' => "Minimum purchase amount of ₹{$coupon->minimum_purchase_amount} required"
            ]);
        }

        // Check usage per user
        $userUsageCount = DB::table('coupon_logs')
            ->where('user_id', $userId)
            ->where('coupon_id', $coupon->coupon_id)
            ->count();

        if ($userUsageCount >= $coupon->usage_per_user) {
            return response()->json([
                'success' => false,
                'message' => 'You have exceeded the maximum usage limit for this coupon'
            ]);
        }

        // Check product applicability
        if ($coupon->applicable_to === 'Specific Products') {
            $applicableProducts = json_decode($coupon->applicable_products, true);
            $cartProducts = CartItem::where('cart_id', $cart->cart_id)
                ->pluck('product_id')
                ->toArray();

            if (!array_intersect($cartProducts, $applicableProducts)) {
                return response()->json([
                    'success' => false,
                    'message' => 'This coupon is not applicable to your cart items'
                ]);
            }
        }

        // Apply coupon without logging to `coupon_logs`
        DB::transaction(function () use ($cart, $coupon, $userId) {
            // Update cart items to apply the coupon
            CartItem::where('cart_id', $cart->cart_id)
                ->update(['applied_coupon_id' => $coupon->coupon_id]);

            // **Removed Logging to `coupon_logs`**
            /*
            DB::table('coupon_logs')->insert([
                'user_id' => $userId,
                'coupon_id' => $coupon->coupon_id,
                'created_at' => now()
            ]);
            */

            // Update coupon usage count
            $coupon->increment('used_count');
        });

        return response()->json([
            'success' => true,
            'message' => 'Coupon applied successfully!'
        ]);
    }

    public function removeCoupon(Request $request)
    {
        try {
            $userId = $request->user_id;

            // Update cart items to remove coupon
            DB::table('cart_items')
                ->join('carts', 'cart_items.cart_id', '=', 'carts.cart_id')
                ->where('carts.user_id', $userId)
                ->update(['applied_coupon_id' => null]);

            return response()->json([
                'success' => true,
                'message' => 'Coupon removed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove coupon'
            ], 500);
        }
    }

    public function getAvailableCoupons(Request $request)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // Get cart total
        $cartTotal = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->where('carts.user_id', $userId)
            ->sum(DB::raw('cart_items.quantity * COALESCE(cart_items.sale_price, cart_items.unit_price)'));

        // Get cart product IDs
        $cartProductIds = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->where('carts.user_id', $userId)
            ->pluck('cart_items.product_id')
            ->toArray();

        // Get current date for comparisons
        $currentDate = now()->toDateString();

        // **Fetch Applied Coupon IDs to Exclude Them**
        $appliedCouponIds = CartItem::whereHas('cart', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->whereNotNull('applied_coupon_id')
            ->pluck('applied_coupon_id')
            ->toArray();

        // Get available coupons excluding already applied coupons
        $coupons = DB::table('coupons')
            ->where('is_active', 1)
            ->where('is_visible', 1)
            ->whereNotIn('coupon_id', $appliedCouponIds)
            ->where(function ($query) use ($cartTotal) {
                $query->whereNull('minimum_purchase_amount')
                    ->orWhere('minimum_purchase_amount', '<=', $cartTotal);
            })
            ->where(function ($query) use ($currentDate) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', $currentDate);
            })
            ->where(function ($query) use ($currentDate) {
                $query->whereNull('start_date')
                    ->orWhere('start_date', '<=', $currentDate);
            })
            ->get();

        // Filter coupons based on usage and applicability
        $availableCoupons = $coupons->filter(function ($coupon) use ($userId, $cartProductIds) {
            // Check usage per user
            $userUsageCount = DB::table('coupon_logs')
                ->where('user_id', $userId)
                ->where('coupon_id', $coupon->coupon_id)
                ->count();

            if ($userUsageCount >= $coupon->usage_per_user) {
                return false;
            }

            // Check total usage
            if ($coupon->used_count >= $coupon->max_uses && $coupon->max_uses != 0) {
                return false;
            }

            // Check product applicability
            if ($coupon->applicable_to === 'Specific Products') {
                // Decode the applicable_products JSON
                $applicableProducts = json_decode($coupon->applicable_products, true);

                // Ensure $applicableProducts is an array
                if (!is_array($applicableProducts)) {
                    // If it's not an array, attempt to convert it
                    // Handle cases where it's a single product ID as string or integer
                    if (is_string($applicableProducts) || is_int($applicableProducts)) {
                        $applicableProducts = [$applicableProducts];
                    } else {
                        // If it's null or another type, treat as no applicable products
                        $applicableProducts = [];
                    }
                }

                // If applicableProducts is empty after decoding, skip this coupon
                if (empty($applicableProducts)) {
                    return false;
                }

                // Check if any cart product IDs intersect with applicable products
                if (!array_intersect($cartProductIds, $applicableProducts)) {
                    return false;
                }
            }

            return true;
        });

        return response()->json([
            'coupons' => $availableCoupons->values(), // Reset keys
            'cartTotal' => $cartTotal
        ]);
    }
}
