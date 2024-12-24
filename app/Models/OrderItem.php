<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_item_id';

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

    // Define relationships
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class, 'applied_offer_id', 'offer_id');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class, 'applied_coupon_id', 'coupon_id');
    }

    public function taxSlab()
    {
        return $this->belongsTo(TaxSlab::class, 'tax_slab_id', 'tax_slab_id');
    }
}
