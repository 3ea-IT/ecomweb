<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Address extends Model
{
    // Specify the correct table name
    protected $table = 'user_addresses';

    protected $primaryKey = 'address_id'; // As per your table schema

    protected $fillable = [
        'user_id',
        'full_name',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'country',
        'postal_code',
        'phone_number',
        'drop_landmark',
        'drop_lat',
        'drop_lng',
        'is_default',
    ];

    // Define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
    /**
     * Relationship with Order (shipping and billing).
     */
    public function shippingOrders()
    {
        return $this->hasMany(Order::class, 'shipping_address_id', 'address_id');
    }

    public function billingOrders()
    {
        return $this->hasMany(Order::class, 'billing_address_id', 'address_id');
    }
}
