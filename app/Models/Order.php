<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_id'; // Set the primary key to `order_id`

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
        'payment_status',
        'razorpay_order_id',
        'razorpay_payment_id', // Add this if missing
        'tax_amount',
        'status',
    ];


}
