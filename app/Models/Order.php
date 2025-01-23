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
        'total_amount',
        'payment_method',
        'order_type',
        'razorpay_order_id',
        'razorpay_payment_id',

        // new columns:
        'porter_estimated_fare',
        'user_delivery_charge',
    ];

    // Define the relationship between Order and OrderItems
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function shippingAddress()
    {
        return $this->belongsTo(Address::class, 'shipping_address_id', 'address_id');
    }
}
