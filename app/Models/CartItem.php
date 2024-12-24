<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_items';
    protected $primaryKey = 'cart_item_id';

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'unit_price',
        'sale_price',
        'total_addon_price',
        'total_price',
        'applied_offer_id',
        'applied_coupon_id',
        'variation_id',
        'addon_ids',
    ];

    // Map 'added_at' to 'created_at'
    const CREATED_AT = 'added_at';

    // Disable 'updated_at'
    const UPDATED_AT = null;

    protected $casts = [
        'addon_ids' => 'array', // Automatically cast JSON to array
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class, 'cart_id', 'cart_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function variation()
    {
        return $this->belongsTo(Variation::class, 'variation_id', 'variation_id');
    }
}
