<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class LoginController extends Controller
{

    public function UserLogin(Request $request)
    {
        try {
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ], 400); // Bad Request
            }

            // Fetch user by email
            $user = User::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                // Generate a token for the user
                $token = $user->createToken('authToken')->plainTextToken;

                Auth::login($user);

                // Return user data along with the token
                return response()->json([
                    'message' => 'Login successful',
                    'user' => [
                        'LogId' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                    'token' => $token,
                ], 200); // OK
            }

            // If login attempt fails (Invalid credentials)
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401); // Unauthorized

        } catch (\Exception $e) {
            // Log the exception for debugging
            Log::error('Login error: ' . $e->getMessage());

            return response()->json([
                'error' => 'An error occurred. Please try again later.'
            ], 500); // Internal Server Error
        }
    }






}
