<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shipping_address_id',
        'shipping_charges',
        'wallet_balance',
        'promo_code',
        'order_number',
        'order_status',
        'promo_discount',
        'discount',
        'total_amount',
        'payment_method',
        'tax_amount',
        'status',
    ];
}
