<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(){
        $data = Product::all();
        $countCart = Cart::where('user_id', 1)->count();
        $UserData = User::where('user_id', 1)->first();
        $CartList = Cart::where('user_id', 1)
                    ->join('products', 'carts.product_id', '=', 'products.id')
                    ->select('carts.*', 'products.name as product_name', 'products.price as product_price', 'products.image_url as product_image_url')
                    ->get();
        return Inertia::render('Order.checkout', [
            'data' => $data,
            'countCart' => $countCart,
            'CartList' => $CartList,
            'UserData' => $UserData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'shipping_address_id' => 'required|integer',
            'shipping_charges' => 'required|numeric',
            'order_number' => 'required',
            'order_status' => 'required',
            'tax_amount' => 'integer',
            'coupon_amount' => 'nullable|numeric',
            'total_amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'card_number' => 'nullable|string',
            'expiry_date' => 'nullable|string',
            'cvv' => 'nullable|string',
        ]);

        $order = Order::create($validated);

        // 3. Retrieve cart items where user_id matches
        $userId = $validated['user_id']; // User ID from request
        $GetCart = Cart::where('user_id', $userId)->get();

        if ($GetCart->isEmpty()) {
            return response()->json([
                'message' => 'No cart items found for the user.'
            ], 404);
        }

        // 4. Update the cart status to 1
        Cart::where('user_id', $userId)->update(['status' => 0]);

        // Redirect to the home page with a success flash message
        return redirect()->route('home')->with('success', 'Order placed successfully!');

        // return response()->json([
        //     'message' => 'Order placed successfully!',
        //     'order' => $order,
        // ]);
    }

}
