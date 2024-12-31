<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $primaryKey = 'coupon_id';

    protected $fillable = [
        'coupon_code',
        'discount_type',
        'discount_value',
        'conditions',
        'max_uses',
        'used_count',
        'start_date',
        'end_date',
        'is_active',
        'updated_at'
    ];

    /**
     * Relationship with OrderItem (if applicable).
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'applied_coupon_id', 'coupon_id');
    }
}
