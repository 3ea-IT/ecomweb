<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $primaryKey = 'offer_id';

    protected $fillable = [
        'brand_id',
        'offer_name',
        'offer_description',
        'discount_type',
        'discount_value',
        'offers_image',
        'start_date',
        'end_date',
        'is_active',
        'conditions',
    ];

    /**
     * Relationship with Brand.
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'brand_id');
    }

    /**
     * Relationship with OrderItem (if applicable).
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'applied_offer_id', 'offer_id');
    }
}
