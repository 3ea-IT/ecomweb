<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Support\Facades\Redirect;

class ContactController extends Controller
{

        // Handle form submission
        public function store(Request $request)
        {
            // Validate form inputs
            $validated = $request->validate([
                'dzName' => 'required|string|max:255',
                'dzEmail' => 'required|email|max:255',
                'dzPhoneNumber' => 'required|string|max:20',
                'dzOtherPerson' => 'required|integer|min:1',
                'dzMessage' => 'required|string',
            ]);

             // Save the data to the database (assuming you have a Contact model and migration)
                Contact::create([
                    'dzName' => $validated['dzName'],
                    'dzEmail' => $validated['dzEmail'],
                    'dzPhoneNumber' => $validated['dzPhoneNumber'],
                    'dzOtherPerson' => $validated['dzOtherPerson'],
                    'dzMessage' => $validated['dzMessage'],
                ]);

            // Return success message
            return response()->json(['message' => 'Form submitted successfully!'], 200);

        }

}

