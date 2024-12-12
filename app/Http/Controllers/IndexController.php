<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function index()
    {
        $data = Product::all();
        $countCart = Cart::where('user_id', 1)->count();
        return Inertia::render('Home', [
            'data' => $data,
            'countCart' => $countCart
        ]);
    }

}
