<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function index()
    {
        $data = Product::where('isaddon','0')->get();

        $user = Auth::user();
        $countCart = $user ? Cart::where('user_id', $user->user_id)->count() : 0;

        return Inertia::render('Home', [
            'data' => $data,
            'countCart' => $countCart
        ]);
    }
}
