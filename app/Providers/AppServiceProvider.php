<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\CartItem;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return [
                    'user' => $user ? [
                        'id' => $user->user_id,
                        'name' => $user->first_name . ' ' . $user->last_name,
                    ] : null,
                ];
            },
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
            'cartCount' => function () {
                // Get user ID from session/auth
                $userId = Auth::id();

                if ($userId) {
                    // First find the user's cart
                    $cart = Cart::where('user_id', $userId)->first();

                    if ($cart) {
                        // Count items in the cart
                        return CartItem::where('cart_id', $cart->cart_id)->sum('quantity');
                    }
                }
                return 0;
            },
        ]);
    }
}
