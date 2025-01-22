<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
  public function index()
  {
    $blogs = Blog::where('is_published', true)
      ->orderBy('published_at', 'desc')
      ->select('id', 'title', 'slug', 'brief', 'cover_image', 'author', 'published_at', 'views')
      ->paginate(9);

    return Inertia::render('Blog', [
      'blogs' => $blogs
    ]);
  }

  public function show(Blog $blog)
  {
    if (!$blog->is_published) {
      abort(404);
    }

    $blog->incrementViews();

    $relatedBlogs = Blog::where('id', '!=', $blog->id)
      ->where('is_published', true)
      ->inRandomOrder()
      ->limit(3)
      ->get(['id', 'title', 'slug', 'brief', 'cover_image']);

    return Inertia::render('BlogDetail', [
      'blog' => $blog,
      'relatedBlogs' => $relatedBlogs
    ]);
  }
}
