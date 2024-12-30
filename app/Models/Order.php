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
        'order_number',
        'order_status',
        'payment_status',
        'shipping_address_id',
        'billing_address_id',
        'subtotal_amount',
        'tax_amount',
        'discount_amount',
        'shipping_charges',
        'coupon_amount',
        'total_amount',
        'payment_method',
        'payment_status',
        'razorpay_order_id',
        'razorpay_payment_id', // Add this if missing
        'tax_amount',
        'status',
    ];


}
