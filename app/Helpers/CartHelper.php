<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use App\Models\Cart;

class CartHelper
{
    public static function getCartCount()
    {
        $user = Auth::user();
        if ($user) {
            return Cart::where('user_id', '1')->count();
        }
        return 0;
    }
}
