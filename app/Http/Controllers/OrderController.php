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
use Illuminate\Support\Facades\Http;


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
            'UserData' => $UserData,
            'googleMapsApiKey' => env('GOOGLE_MAPS_API_KEY'),
        ]);
    }

    public function store(Request $request)
    {
        $userAddressID = DB::table('user_addresses')
            ->where('user_id', $request->user_id)
            ->first();

        $randomNumber = rand(10000, 99999);
        $orderNumber = 'KPT_O' . $randomNumber;
        $orderId = uniqid('order_', true);

        DB::beginTransaction();

        try {
            // Get cart and items
            $UserCart = Cart::where('user_id', $request->user_id)->first();
            if (!$UserCart) {
                return response()->json(['message' => 'User cart not found.'], 404);
            }

            $CartItems = CartItem::where('cart_id', $UserCart->cart_id)->get();

            // Calculate actual discount from cart items
            $processedCoupons = [];
            $actualDiscount = 0;

            foreach ($CartItems as $item) {
                if ($item->applied_coupon_id && !in_array($item->applied_coupon_id, $processedCoupons)) {
                    // Only count each coupon's discount once
                    $couponDiscount = DB::table('cart_items')
                        ->where('cart_id', $UserCart->cart_id)
                        ->where('applied_coupon_id', $item->applied_coupon_id)
                        ->value('cou_discount_value');

                    $actualDiscount += floatval($couponDiscount ?? 0);
                    $processedCoupons[] = $item->applied_coupon_id;
                }
            }

            // Create the order with verified amounts
            $order = Order::create([
                'order_id' => $orderId,
                'order_type' => $request->OrderType,
                'user_id' => $request->user_id,
                'shipping_address_id' => $userAddressID->address_id,
                'shipping_charges' => $request->shipping_charges,
                'tax_amount' => $request->tax_amount,
                'discount_amount' => $actualDiscount,
                'subtotal_amount' => $request->subtotal_amount,
                'total_amount' => $request->total_amount,
                'payment_method' => $request->payment_method,
                'order_number' => $orderNumber,
                'order_status' => $request->order_status,
                'payment_status' => 'Pending',
            ]);

            // Create order items
            foreach ($CartItems as $CartItem) {
                $product = Product::find($CartItem->product_id);
                $taxRate = 0;

                if ($product && $product->tax_slab_id !== null) {
                    $taxSlab = DB::table('tax_slabs')
                        ->where('tax_slab_id', $product->tax_slab_id)
                        ->first();
                    $taxRate = $taxSlab ? $taxSlab->gst : 0;
                }

                $mrp = $CartItem->sale_price ?? $CartItem->unit_price;
                $quantity = $CartItem->quantity;
                $lineTotal = $mrp * $quantity;
                $taxAmount = ($lineTotal * $taxRate) / 100;

                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $CartItem->product_id,
                    'product_name_snapshot' => $product->product_name ?? 'Unknown Product',
                    'mrp' => $mrp,
                    'quantity' => $quantity,
                    'line_total' => $lineTotal,
                    'applied_coupon_id' => $CartItem->applied_coupon_id,
                    'tax_slab_id' => $product->tax_slab_id ?? 0,
                    'tax_amount' => $taxAmount,
                ]);

                // Handle addons (keep existing addon logic)
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
                                'applied_coupon_id' => $CartItems[0]->applied_coupon_id,
                                'tax_slab_id' => $addonProduct->tax_slab_id !== null ? $addonProduct->tax_slab_id : 0,
                                'tax_amount' => $addonTaxAmount,
                            ]);
                        }
                    }
                }
            }

            // Clear the cart
            CartItem::where('cart_id', $UserCart->cart_id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully!',
                'order_id' => $order->order_id
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Order placement failed.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPorterQuote(Request $request)
    {
        $pickupLat = $request->input('pickup_details.lat');
        $pickupLng = $request->input('pickup_details.lng');
        $dropLat   = $request->input('drop_details.lat');
        $dropLng   = $request->input('drop_details.lng');
        $customerName  = $request->input('customer.name');
        $customerPhone = $request->input('customer.mobile.number');
        $countryCode   = $request->input('customer.mobile.country_code');

        // The Porter token (header X-API-KEY).
        $porterToken = env('PORTER_API_KEY'); // or config('services.porter.api_key');

        $payload = [
            'pickup_details' => [
                'lat' => (float) $pickupLat,
                'lng' => (float) $pickupLng,
            ],
            'drop_details' => [
                'lat' => (float) $dropLat,
                'lng' => (float) $dropLng,
            ],
            'customer' => [
                'name' => $customerName,
                'mobile' => [
                    'country_code' => $countryCode,
                    'number'       => $customerPhone,
                ],
            ],
        ];

        try {
            $response = Http::withHeaders([
                'X-API-KEY'    => $porterToken,
                'Content-Type' => 'application/json',
            ])
                ->withBody(
                    json_encode($payload),
                    'application/json'
                )
                ->get('https://pfe-apigw-uat.porter.in/v1/get_quote');

            if ($response->failed()) {
                return response()->json([
                    'error'   => true,
                    'message' => 'Failed to fetch Porter quote',
                    'details' => $response->json(),
                ], $response->status());
            }

            // Get the raw JSON
            $originalData = $response->json();

            // Filter for only the 2 Wheeler
            $vehicles = $originalData['vehicles'] ?? [];
            $onlyTwoWheeler = array_filter($vehicles, function ($v) {
                return isset($v['type']) && $v['type'] === '2 Wheeler';
            });

            // If you only expect one 2-Wheeler entry, you could grab the first match:
            $twoWheeler = array_values($onlyTwoWheeler);
            $twoWheelerData = count($twoWheeler) > 0 ? $twoWheeler[0] : null;

            // If you just need the minor_amount from the 2 Wheeler:
            if ($twoWheelerData) {
                // e.g. return only its fare info
                // $fareInPaise = $twoWheelerData['fare']['minor_amount'];
                // $fareInRupees = $fareInPaise / 100;
                // return response()->json(['2_wheeler_fare' => $fareInRupees]);

                // Or return the entire 2W object
                return response()->json($twoWheelerData, 200);
            }

            // If no 2 Wheeler was found, return something else
            return response()->json([
                'error' => true,
                'message' => 'No 2 Wheeler option available',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function createRazorpayOrder(Request $request)
    {
        try {
            $api = new \Razorpay\Api\Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            // Create Razorpay order
            $razorpayOrder = $api->order->create([
                'amount' => intval($request->amount), // in paise
                'currency' => 'INR',
                'payment_capture' => 1,
            ]);

            // Generate an internal order_number
            $randomNumber = rand(10000, 99999);
            $orderNumber = 'KPT_O' . $randomNumber;
            $orderId = uniqid('order_', true);

            DB::beginTransaction();
            try {
                // Insert into orders table with status = Pending
                $order = Order::create([
                    'order_id'            => $orderId,
                    'order_type'          => $request->OrderType,
                    'user_id'             => $request->user_id,
                    'shipping_address_id' => $request->shipping_address_id,

                    // store new columns
                    'porter_estimated_fare' => $request->porter_estimated_fare ?? 0,
                    'user_delivery_charge'  => $request->user_delivery_charge ?? 0,

                    'shipping_charges'    => $request->shipping_charges,
                    'tax_amount'          => $request->tax_amount,
                    'discount_amount'     => $request->coupon_amount,
                    'subtotal_amount'     => $request->subtotal_amount,
                    'total_amount'        => $request->total_amount,
                    'payment_method'      => $request->payment_method,
                    'order_number'        => $orderNumber,
                    // Make sure order_status is 'Pending'
                    'order_status'        => 'Pending',
                    'payment_status'      => 'Pending',
                    'razorpay_order_id'   => $razorpayOrder->id
                ]);

                // Also create a Payment record with status=Pending
                Payment::create([
                    'order_id'           => $order->order_id,    // numeric PK
                    'razorpay_order_id'  => $razorpayOrder->id,
                    'payment_status'     => 'Pending'
                ]);

                DB::commit();

                return response()->json([
                    'razorpay_order_id' => $razorpayOrder->id,
                    'order_id'          => $order->order_id,
                ], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            \Log::error('Error creating Razorpay order:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to create Razorpay order.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }



    public function confirmPayment(Request $request)
    {
        try {
            $api = new \Razorpay\Api\Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            // Verify payment signature
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ]);

            DB::beginTransaction();
            try {
                // Find order first
                $order = Order::where('razorpay_order_id', $request->razorpay_order_id)->first();
                if (!$order) {
                    throw new \Exception('Order not found');
                }

                // Get cart items for this user
                $cart = Cart::where('user_id', $order->user_id)->first();
                $cartItems = $cart ? CartItem::where('cart_id', $cart->cart_id)->get() : [];

                // Process cart items
                foreach ($cartItems as $cartItem) {
                    $product = Product::find($cartItem->product_id);
                    $taxRate = 0;

                    // Calculate tax if applicable
                    if ($product && $product->tax_slab_id !== null) {
                        $taxSlab = DB::table('tax_slabs')
                            ->where('tax_slab_id', $product->tax_slab_id)
                            ->first();
                        $taxRate = $taxSlab ? $taxSlab->gst : 0;
                    }

                    $mrp = $cartItem->sale_price ?? $cartItem->unit_price;
                    $quantity = $cartItem->quantity;
                    $lineTotal = $mrp * $quantity;
                    $taxAmount = ($lineTotal * $taxRate) / 100;

                    // Create order item
                    OrderItem::create([
                        'order_id' => $order->order_id,
                        'product_id' => $cartItem->product_id,
                        'product_name_snapshot' => $product->product_name ?? 'Unknown Product',
                        'mrp' => $mrp,
                        'quantity' => $quantity,
                        'line_total' => $lineTotal,
                        'applied_coupon_id' => $cartItem->applied_coupon_id,
                        'tax_slab_id' => $product->tax_slab_id ?? 0,
                        'tax_amount' => $taxAmount,
                    ]);

                    // Handle addons if present
                    if (!empty($cartItem->addon_ids)) {
                        $addonIds = is_array($cartItem->addon_ids) ?
                            $cartItem->addon_ids : json_decode($cartItem->addon_ids, true);

                        foreach ($addonIds as $addonId) {
                            $addonProduct = Product::where('product_id', $addonId)->first();
                            $addonTaxRate = 0;

                            if ($addonProduct && $addonProduct->tax_slab_id !== null) {
                                $addonTaxSlab = DB::table('tax_slabs')
                                    ->where('tax_slab_id', $addonProduct->tax_slab_id)
                                    ->first();
                                $addonTaxRate = $addonTaxSlab ? $addonTaxSlab->gst : 0;
                            }

                            $addonMrp = $addonProduct->base_sale_price ?? $addonProduct->base_mrp;
                            $addonTaxAmount = ($addonMrp * $addonTaxRate) / 100;

                            if ($addonProduct) {
                                OrderItem::create([
                                    'order_id' => $order->order_id,
                                    'product_id' => $addonProduct->product_id,
                                    'mrp' => $addonMrp,
                                    'quantity' => 1,
                                    'product_name_snapshot' => $addonProduct->product_name ?? 'Unknown Addon Product',
                                    'line_total' => $addonMrp,
                                    'applied_coupon_id' => $cartItems[0]->applied_coupon_id,
                                    'tax_slab_id' => $addonProduct->tax_slab_id ?? 0,
                                    'tax_amount' => $addonTaxAmount,
                                ]);
                            }
                        }
                    }
                }

                // Update order status
                $order->update([
                    'payment_status' => 'Paid',
                    'order_status' => 'pending',
                    'razorpay_payment_id' => $request->razorpay_payment_id
                ]);

                // Update payment record
                Payment::where('razorpay_order_id', $request->razorpay_order_id)
                    ->update([
                        'payment_status' => 'Paid',
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'razorpay_signature' => $request->razorpay_signature,
                        'mop' => 'Razorpay'
                    ]);

                // Clear the cart
                if ($cart) {
                    CartItem::where('cart_id', $cart->cart_id)->delete();
                }

                DB::commit();
                return response()->json([
                    'message' => 'Payment verified and order updated successfully.'
                ], 200);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            \Log::error('Payment verification failed:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Payment verification failed.',
                'error' => $e->getMessage()
            ], 400);
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

    public function show($orderId)
    {
        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('home')->withErrors('You must be logged in.');
        }

        $order = Order::where('order_id', $orderId)
            ->where('user_id', $userId)
            ->with('items', 'shippingAddress')
            ->firstOrFail();

        $countCart = Cart::join('cart_items', 'carts.cart_id', '=', 'cart_items.cart_id')
            ->where('carts.user_id', $userId)
            ->sum('cart_items.quantity');

        $UserData = User::where('user_id', $userId)->first();

        // Just pass the entire order; 'status_message' is now automatically included
        return Inertia::render('Order/OrderDetail', [
            'order'     => $order,       // Includes order_status + status_message
            'countCart' => $countCart,
            'UserData'  => $UserData
        ]);
    }
}
