<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
  public function index()
  {
    return Inertia::render('Reservations');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255',
      'phone' => 'required|string|max:20',
      'date' => 'required|date|after:today',
      'time' => 'required',
      'guests' => 'required|integer|min:1|max:20',
      'special_requests' => 'nullable|string|max:1000',
      'occasion' => 'nullable|string|in:birthday,anniversary,business,other',
    ]);

    $reservation = Reservation::create($validated);

    // Here you might want to send confirmation emails
    // Mail::to($validated['email'])->send(new ReservationConfirmation($reservation));

    return redirect()->back()->with('success', 'Reservation request submitted successfully! We will confirm shortly.');
  }
}
