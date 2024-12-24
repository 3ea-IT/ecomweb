<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Cart;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => [
                'user' => Auth::check() ? [
                    'user_id' => Auth::user()->user_id,
                    'name' => Auth::user()->first_name . ' ' . Auth::user()->last_name,
                    // Add other user attributes as needed
                ] : null,
            ],
            // Share flash messages
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
            // Share cart count dynamically based on authenticated user
            'cartCount' => function () {
                $user = Auth::user();
                if ($user) {
                    $cart = Cart::where('user_id', $user->user_id)->first();
                    return $cart ? $cart->items->count() : 0;
                }
                return 0;
            },
        ]);
    }
}
