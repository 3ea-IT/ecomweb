<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variation extends Model
{
    use HasFactory;

    protected $primaryKey = 'variation_id';

    protected $fillable = [
        'product_id',
        'variation_name',
        'base_mrp',
        'base_sp',
        'quantity',
        'is_active',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}
