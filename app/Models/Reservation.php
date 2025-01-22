<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'email',
    'phone',
    'date',
    'time',
    'guests',
    'special_requests',
    'occasion',
    'status'
  ];

  protected $casts = [
    'date' => 'date',
    'time' => 'datetime',
  ];

  public function scopeUpcoming($query)
  {
    return $query->where('date', '>=', now())->where('status', 'confirmed');
  }

  public function scopePending($query)
  {
    return $query->where('status', 'pending');
  }
}
