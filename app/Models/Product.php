<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'product_id'; // Ensure this matches your database

    protected $fillable = [
        'brand_id',
        'primary_category_id',
        'product_name',
        'product_description',
        'product_sku',
        'main_image_url',
        'additional_image_urls',
        'base_mrp',
        'base_sale_price',
        'tax_slab_id',
        'stock_quantity',
        'discount',
        'isaddon',
        'is_active',
    ];

    // Relationship to fetch add-ons
    public function addons()
    {
        return $this->belongsToMany(
            Product::class,
            'product_addon',
            'product_id',
            'addon_id'
        )
            ->where('products.isaddon', 1)
            ->where('products.is_active', 1); // Specify the table
    }

    // Relationship to fetch products that include this product as an add-on
    public function parentProducts()
    {
        return $this->belongsToMany(
            Product::class,
            'product_addon',
            'addon_id',
            'product_id'
        );
    }

    // Relationship to variations
    public function variations()
    {
        return $this->hasMany(Variation::class, 'product_id', 'product_id');
    }
}
