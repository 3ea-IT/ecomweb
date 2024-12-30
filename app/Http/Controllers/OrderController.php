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
use App\Models\Payment;
use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $countCart = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->where('carts.user_id', $userId)
            ->sum('cart_items.quantity');

        $UserData = User::where('user_id', $userId)->first();

        return Inertia::render('Order/Checkout', [
            'countCart' => $countCart,
            'UserData' => $UserData
        ]);
    }

    public function store(Request $request)
    {
        $randomNumber = rand(10000, 99999);

        $orderNumber =  'KPT_O' . $randomNumber;

        $orderId = uniqid('order_', true);

        DB::beginTransaction();

        try {
            // Create the order
            $order = Order::create([
                'order_id' => $orderId,
                'user_id' => $request->user_id,
                'shipping_address_id' => $request->shipping_address_id,
                'shipping_charges' => $request->shipping_charges,
                'tax_amount' => $request->tax_amount,
                // 'coupon_amount' => $request->coupon_amount,
                'total_amount' => $request->total_amount,
                'payment_method' => $request->payment_method,
                'order_number' => $orderNumber,
                'order_status' => $request->order_status,
                'payment_status' => 'Pending',
            ]);

            $UserCart = Cart::where('user_id', $request->user_id)->first();
            if (!$UserCart) {
                return response()->json(['message' => 'User cart not found.'], 404);
            }

            $CartID = $UserCart->cart_id;
            $CartItems = CartItem::where('cart_id', $CartID)->get();

            if ($CartItems->isEmpty()) {
                return response()->json(['message' => 'No items in the cart.'], 404);
            }

            foreach ($CartItems as $CartItem) {
                // Fetch the main product
                $product = Product::find($CartItem->product_id);
                $taxRate = 0;

                // Fetch tax slab details if the tax_slab_id is valid
                if ($product && $product->tax_slab_id !== null) {
                    $taxSlab = DB::table('tax_slabs')->where('tax_slab_id', $product->tax_slab_id)->first();
                    $taxRate = $taxSlab ? $taxSlab->gst : 0;
                }

                // Calculate tax amount
                $mrp = $CartItem->sale_price ?? $CartItem->unit_price;
                $quantity = $CartItem->quantity;
                $lineTotal = $mrp * $quantity;
                $taxAmount = ($lineTotal * $taxRate) / 100; // Tax amount based on the percentage

                // Create the main order item
                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $CartItem->product_id,
                    'mrp' => $mrp,
                    'quantity' => $quantity,
                    'product_name_snapshot' => $product->product_name ?? 'Unknown Product',
                    'line_total' => $lineTotal,
                    'tax_slab_id' => $product && $product->tax_slab_id !== null ? $product->tax_slab_id : 0,
                    'tax_amount' => $taxAmount,
                ]);

                // Handle addons
                if (!empty($CartItem->addon_ids)) {
                    $addonIds = is_array($CartItem->addon_ids) ? $CartItem->addon_ids : json_decode($CartItem->addon_ids, true);
                    foreach ($addonIds as $addonId) {
                        $addonProduct = Product::where('product_id', $addonId)->first();
                        $addonTaxRate = 0;

                        // Fetch tax slab details for the addon
                        if ($addonProduct && $addonProduct->tax_slab_id !== null) {
                            $addonTaxSlab = DB::table('tax_slabs')->where('tax_slab_id', $addonProduct->tax_slab_id)->first();
                            $addonTaxRate = $addonTaxSlab ? $addonTaxSlab->gst : 0;
                        }

                        // Calculate tax amount for the addon
                        $addonMrp = $addonProduct->base_sale_price ?? $addonProduct->base_mrp;
                        $addonTaxAmount = ($addonMrp * $addonTaxRate) / 100;

                        // Create the addon order item
                        if ($addonProduct) {
                            OrderItem::create([
                                'order_id' => $order->order_id,
                                'product_id' => $addonProduct->product_id,
                                'mrp' => $addonMrp,
                                'quantity' => 1,
                                'product_name_snapshot' => $addonProduct->product_name ?? 'Unknown Addon Product',
                                'line_total' => $addonMrp,
                                'tax_slab_id' => $addonProduct->tax_slab_id !== null ? $addonProduct->tax_slab_id : 0,
                                'tax_amount' => $addonTaxAmount,
                            ]);
                        }
                    }
                }
            }

            // Clear the user's cart
            CartItem::where('cart_id', $CartID)->delete();

            DB::commit();

            return response()->json(['message' => 'Order placed successfully!', 'order_id' => $order->order_id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order placement failed.', 'error' => $e->getMessage()], 500);
        }
    }


    public function createRazorpayOrder(Request $request)
    {
        try {
            $api = new \Razorpay\Api\Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            $razorpayOrder = $api->order->create([
                'amount' => $request->amount,
                'currency' => 'INR',
                'payment_capture' => 1,
                'notes' => [
                    'order_id' => $request->order_id,
                ],
            ]);

            $order = Order::where('order_id', $request->order_id)->first();
            if ($order) {
                $order->update(['razorpay_order_id' => $razorpayOrder->id]);
            }

            Payment::create([
                'order_id' => $request->order_id,
                'razorpay_order_id' => $razorpayOrder->id,
            ]);

            return response()->json(['razorpay_order_id' => $razorpayOrder->id], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating Razorpay order:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to create Razorpay order.', 'error' => $e->getMessage()], 500);
        }
    }


    public function confirmPayment(Request $request)
    {
        try {
            $api = new \Razorpay\Api\Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            $api->utility->verifyPaymentSignature([
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ]);

            $orderPayment = Payment::where('razorpay_order_id', $request->razorpay_order_id)->first();
            if ($orderPayment) {
                $orderPayment->update([
                    'payment_status' => 'Paid',
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'razorpay_signature' => $request->razorpay_signature,
                    'mop' => 'Razorpay',
                ]);
            }

            $order = Order::where('razorpay_order_id', $request->razorpay_order_id)->first();
            if ($order) {
                $order->update([
                    'payment_status' => 'Paid',
                    'razorpay_payment_id' => $request->razorpay_payment_id
                ]);
                return response()->json(['message' => 'Payment verified and order updated successfully.'], 200);
            }

            return response()->json(['message' => 'Order not found.'], 404);
        } catch (\Exception $e) {
            \Log::error('Payment verification failed:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Payment verification failed.', 'error' => $e->getMessage()], 400);
        }
    }


    public function OrderItems(Request $request)
    {
        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // Fetch orders with their associated items using the 'items' relationship
        $orders = Order::where('user_id', $userId)
                    ->with('items')  // Eager load the related items
                    ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }









}
