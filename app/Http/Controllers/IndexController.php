<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index()
    {
        $data = Product::where('stock_quantity',1)->where('isaddon',0)->where('is_active',1)->get();
        $countCart = Cart::where('user_id', 1)->count();
        return Inertia::render('Home', [
            'data' => $data,
            'countCart' => $countCart
        ]);
    }
}
