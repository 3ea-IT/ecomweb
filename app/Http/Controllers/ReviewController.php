<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;

use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

  public function index()
  {
    $reviews = Review::where('is_featured', true)
      ->orderBy('created_at', 'desc')
      ->paginate(9);

    return Inertia::render('ReviewsPage', [
      'reviews' => $reviews
    ]);
  }
}
