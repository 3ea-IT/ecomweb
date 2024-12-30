<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_item_id'; // Set the primary key to `order_item_id`

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name_snapshot',
        'mrp',
        'discounted_price',
        'quantity',
        'line_total',
        'applied_offer_id',
        'applied_coupon_id',
        'tax_slab_id',
        'tax_amount',
    ];

    // Define the relationship between OrderItem and Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }


}
