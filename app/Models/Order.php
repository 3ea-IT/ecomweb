<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address_id',
        'total_item',
        'item_total',
        'delivery_charge',
        'wallet_balance',
        'promo_code',
        'promo_discount',
        'discount',
        'total_payable',
        'payment_method',
        'lat',
        'long',
        'delivery_time',
        'delivery_date',
        'otp',
        'notes',
        'status',
    ];
}
