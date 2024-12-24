<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Coupon;
use App\Models\Offer;
use App\Models\TaxSlab;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index()
    {
        // The frontend will handle fetching cart items via API
        return Inertia::render('Order.checkout');
    }

    /**
     * Store a new order and its items.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        // Validate the incoming data
        $validated = $request->validate([
            'shipping_address_id' => 'required|integer|exists:addresses,address_id',
            'billing_address_id' => 'required|integer|exists:addresses,address_id',
            'shipping_charges' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'coupon_amount' => 'nullable|numeric',
            'total_amount' => 'required|numeric',
            'payment_method' => 'required|string|in:cod,card',
            'card_number' => 'nullable|string',
            'expiry_date' => 'nullable|string',
            'cvv' => 'nullable|string',
        ]);

        try {
            // Start a database transaction
            DB::beginTransaction();

            // Generate a unique order number (customize as needed)
            $orderNumber = strtoupper(uniqid('ORDER_'));

            // Create the Order
            $order = Order::create([
                'user_id' => $user->user_id,
                'order_number' => $orderNumber,
                'order_status' => 'pending',
                'payment_status' => 'pending',
                'shipping_address_id' => $validated['shipping_address_id'],
                'billing_address_id' => $validated['billing_address_id'],
                'subtotal_amount' => $request->input('subtotal_amount', 0.00),
                'tax_amount' => $validated['tax_amount'],
                'discount_amount' => $request->input('discount_amount', 0.00),
                'shipping_charges' => $validated['shipping_charges'],
                'total_amount' => $validated['total_amount'],
                'payment_method' => $validated['payment_method'],
                'card_number' => $validated['payment_method'] === 'card' ? $validated['card_number'] : null,
                'expiry_date' => $validated['payment_method'] === 'card' ? $validated['expiry_date'] : null,
                'cvv' => $validated['payment_method'] === 'card' ? $validated['cvv'] : null,
            ]);

            // Fetch cart items for the user
            $cartItems = CartItem::where('cart_id', function ($query) use ($user) {
                $query->select('cart_id')->from('carts')->where('user_id', $user->user_id);
            })->get();

            if ($cartItems->isEmpty()) {
                // Rollback the transaction if no cart items are found
                DB::rollBack();
                return response()->json(['error' => 'No items in the cart to place an order.'], 400);
            }

            // Optional: Handle applied coupons or offers here
            // Since frontend is not utilizing them yet, we'll skip for now

            // Loop through cart items and create order_items
            foreach ($cartItems as $item) {
                // Determine the applicable price
                $applicablePrice = $item->sale_price ?? $item->unit_price;

                // Optional: Fetch coupon and offer details if applicable
                // For now, we can set them to null or handle as per your logic
                $appliedCouponId = null; // Replace with actual logic if needed
                $appliedOfferId = null;  // Replace with actual logic if needed

                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $item->product_id,
                    'product_name_snapshot' => $item->product->product_name,
                    'mrp' => $item->unit_price,
                    'discounted_price' => $applicablePrice,
                    'quantity' => $item->quantity,
                    'line_total' => ($applicablePrice * $item->quantity) + $item->total_addon_price,
                    'applied_offer_id' => $appliedOfferId,
                    'applied_coupon_id' => $appliedCouponId,
                    'tax_slab_id' => $item->product->tax_slab_id, // Assuming Product has tax_slab_id
                    'tax_amount' => $item->tax_amount,
                ]);
            }

            // Clear the cart items
            CartItem::where('cart_id', $cartItems->first()->cart_id)->delete();

            // Optionally, delete the cart
            Cart::where('user_id', $user->user_id)->delete();

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully!',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of errors
            DB::rollBack();
            Log::error('Error placing order: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while placing the order. Please try again later.'], 500);
        }
    }

    /**
     * Update the quantity of a cart item.
     */
    public function updateQuantityInDatabase(Request $request, $cartItemId)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'action' => 'required|in:increase,decrease',
        ]);

        try {
            // Retrieve the cart item based on cartItemId
            $cartItem = CartItem::find($cartItemId);

            if (!$cartItem) {
                return response()->json(['message' => 'Item not found in cart'], 404);
            }

            // Update quantity based on the action
            if ($validated['action'] === 'increase') {
                $cartItem->quantity += 1;
            } elseif ($validated['action'] === 'decrease') {
                $cartItem->quantity = max($cartItem->quantity - 1, 1); // Ensure quantity doesn't go below 1
            }

            // Recalculate total_price
            $applicablePrice = $cartItem->sale_price ?? $cartItem->unit_price;
            $cartItem->total_price = ($applicablePrice * $cartItem->quantity) + $cartItem->total_addon_price;

            // Save the updated cart item
            $cartItem->save();

            return response()->json(['message' => 'Quantity updated successfully', 'cartItem' => $cartItem]);
        } catch (\Exception $e) {
            // Handle any unexpected errors
            Log::error('Error updating quantity: ' . $e->getMessage());
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove a cart item.
     */
    public function removeCartItem(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required|integer|exists:cart_items,cart_item_id',
        ]);

        $cartItem = CartItem::find($validated['cart_item_id']);

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed successfully']);
    }
}
