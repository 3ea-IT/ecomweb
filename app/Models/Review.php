<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
  protected $fillable = [
    'reviewer_name',
    'reviewer_image',
    'rating',
    'review_text',
    'platform',
    'platform_icon',
    'display_section',
    'is_featured'
  ];

  protected $casts = [
    'rating' => 'float',
    'is_featured' => 'boolean',
  ];
}
