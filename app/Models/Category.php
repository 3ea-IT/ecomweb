<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $primaryKey = 'category_id';

  protected $fillable = [
    'brand_id',
    'category_type',
    'parent_category_id',
    'category_name',
    'category_description',
    'is_active'
  ];

  // Get all products in this category
  public function products()
  {
    return $this->hasMany(Product::class, 'primary_category_id', 'category_id');
  }

  // Get parent category
  public function parent()
  {
    return $this->belongsTo(Category::class, 'parent_category_id');
  }

  // Get child categories
  public function children()
  {
    return $this->hasMany(Category::class, 'parent_category_id');
  }
}
