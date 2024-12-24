<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{

    public function UserLogin(Request $request)
    {
        try {
            // 1. Validate incoming request
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ], 400); // Bad Request
            }

            // 2. Fetch user by email
            $user = User::where('email', $request->email)->first();

            // 3. Check if user exists and password matches
            if ($user && Hash::check($request->password, $user->password_hash)) {
                // Generate a token for the user
                $token = $user->createToken('authToken')->plainTextToken;

                // Log the user in (optional for session-based systems)
                Auth::login($user);

                // session(['user_id' => $user->user_id]);

                // 4. Return user data along with the token
                return response()->json([
                    'message' => 'Login successful',
                    'user' => [
                        'LogId' => $user->user_id, // Assuming 'id' is the unique user ID
                        'name' => $user->first_name . ' ' . $user->last_name,
                        'email' => $user->email,
                    ],
                    'token' => $token,
                    // 'session_user_id' => session('user_id'),
                ], 200); // OK
            }

            // 5. Invalid credentials
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
