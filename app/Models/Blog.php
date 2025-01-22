<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'slug',
    'brief',
    'cover_image',
    'content',
    'author',
    'read_time',
    'views',
    'published_at',
    'is_published',
    'meta_title',
    'meta_description'
  ];

  protected $casts = [
    'published_at' => 'datetime',
    'is_published' => 'boolean',
  ];

  public function getRouteKeyName()
  {
    return 'slug';
  }

  public function incrementViews()
  {
    $this->increment('views');
  }
}
