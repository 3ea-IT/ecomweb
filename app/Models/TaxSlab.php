<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxSlab extends Model
{
    use HasFactory;

    protected $primaryKey = 'tax_slab_id';

    protected $fillable = [
        'slab_name',
        'gst',
        'HSNCode',
        'note',
        'is_active',
    ];

    /**
     * Relationship with Product.
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'tax_slab_id', 'tax_slab_id');
    }

    /**
     * Relationship with OrderItem.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'tax_slab_id', 'tax_slab_id');
    }
}
