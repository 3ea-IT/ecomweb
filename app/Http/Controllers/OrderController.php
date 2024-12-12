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
        $UserData = User::where('id', 1)->first();
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
            'address_id' => 'required|integer',
            'item_total' => 'required|numeric',
            'delivery_charge' => 'required|numeric',
            'tax_charge' => 'required|numeric',
            'coupon_amount' => 'nullable|numeric',
            'total_amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'card_number' => 'nullable|string',
            'expiry_date' => 'nullable|string',
            'cvv' => 'nullable|string',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order placed successfully!',
            'order' => $order,
        ]);
    }

}
