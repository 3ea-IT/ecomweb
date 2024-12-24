<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

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
        'card_number',
        'expiry_date',
        'cvv',
    ];

    // Define relationships
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'order_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function shippingAddress()
    {
        return $this->belongsTo(Address::class, 'shipping_address_id', 'address_id');
    }

    public function billingAddress()
    {
        return $this->belongsTo(Address::class, 'billing_address_id', 'address_id');
    }
}
