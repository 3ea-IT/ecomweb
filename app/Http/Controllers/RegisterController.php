<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Address;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    /**
     * Handle the registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function register(Request $request)
    {
        // Define validation rules
        $validator = Validator::make($request->all(), [
            // User fields
            'first_name'       => 'required|string|max:100',
            'last_name'        => 'required|string|max:100',
            'email'            => 'required|email|unique:users,email',
            'phone'            => 'required|string|max:50',
            'password'         => 'required|string|min:6|confirmed',

            // Address fields
            'address_line_1'   => 'required|string|max:255',
            'address_line_2'   => 'nullable|string|max:255',
            'city'             => 'required|string|max:100',
            'state'            => 'required|string|max:100',
            'country'          => 'required|string|max:100',
            'postal_code'      => 'required|string|max:50',
        ]);

        // Check for validation failures
        if ($validator->fails()) {
            // Redirect back with validation errors
            return redirect()->back()
                             ->withErrors($validator)
                             ->withInput();
        }

        // Begin Transaction
        DB::beginTransaction();

        try {
            // Create the user
            $user = User::create([
                'first_name'      => $request->first_name,
                'last_name'       => $request->last_name,
                'email'           => $request->email,
                'phone'           => $request->phone,
                'password_hash'   => Hash::make($request->password),
                'user_role_id'    => 1, // Adjust as needed
                'is_active'       => 1,
            ]);

            // Create the address
            Address::create([
                'user_id'          => $user->user_id,
                'full_name'        => $request->first_name . ' ' . $request->last_name,
                'address_line_1'   => $request->address_line_1,
                'address_line_2'   => $request->address_line_2 ?? null,
                'city'             => $request->city,
                'state'            => $request->state,
                'country'          => $request->country,
                'postal_code'      => $request->postal_code,
                'is_default'       => 1, // Adjust as needed
            ]);

            // Commit Transaction
            DB::commit();

            // Redirect to the home page with a success flash message
            return redirect()->route('home')->with('success', 'Registration successful! Welcome aboard.');
        } catch (\Exception $e) {
            // Rollback Transaction
            DB::rollBack();

            // Log the error for debugging
            Log::error('Registration Error: ' . $e->getMessage());

            // Redirect back with an error flash message
            return redirect()->back()->with('error', 'An error occurred during registration. Please try again.');
        }
    }
}