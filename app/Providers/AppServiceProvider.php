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
                $user = Auth::user();
                if ($user) {
                    // Use a more direct query to count cart items
                    return CartItem::whereHas('cart', function ($query) use ($user) {
                        $query->where('user_id', $user->user_id);
                    })->count();
                }
                return 0;
            },
        ]);
    }
}
