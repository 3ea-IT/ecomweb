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
        'time' => 'required|date_format:H:i',  // Ensure time format is correct
        'endtime' => 'nullable|date_format:H:i|after:time',  // endtime must be after the time field if provided
        'is_catering' => 'nullable|in:yes,no',  // Only accept 'yes' or 'no'
        'catering_address' => 'nullable|string|max:255',  // Catering address should be nullable
        'guests' => 'required|integer|min:1|max:20',
        'special_requests' => 'nullable|string|max:1000',
        'occasion' => 'nullable|string|in:birthday,anniversary,business,other',
        'duration' => 'nullable|integer|min:1',
    ]);

    $reservation = Reservation::create($validated);

    // Here you might want to send confirmation emails
    // Mail::to($validated['email'])->send(new ReservationConfirmation($reservation));

    return redirect()->back()->with('success', 'Reservation request submitted successfully! We will confirm shortly.');
  }
}
