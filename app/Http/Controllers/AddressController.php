<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
  public function index(Request $request)
  {
    $userId = $request->query('user_id');

    $addresses = Address::where('user_id', $userId)
      ->orderBy('is_default', 'desc')
      ->orderBy('created_at', 'desc')
      ->get();

    return response()->json($addresses);
  }

  public function store(Request $request)
  {
    $request->validate([
      'user_id' => 'required|exists:users,user_id',
      'full_name' => 'required|string|max:150',
      'address_line_1' => 'required|string|max:255',
      'address_line_2' => 'nullable|string|max:255',
      'city' => 'required|string|max:100',
      'state' => 'required|string|max:100',
      'country' => 'required|string|max:100',
      'postal_code' => 'required|string|max:50',
      'phone_number' => 'required|string|max:50',
      'is_default' => 'boolean'
    ]);

    DB::beginTransaction();

    try {
      // If this is set as default address, remove default status from other addresses
      if ($request->is_default) {
        Address::where('user_id', $request->user_id)
          ->where('is_default', true)
          ->update(['is_default' => false]);
      }

      $address = Address::create($request->all());

      DB::commit();

      return response()->json($address, 201);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => 'Failed to create address', 'error' => $e->getMessage()], 500);
    }
  }

  public function show($id)
  {
    $address = Address::findOrFail($id);
    return response()->json($address);
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'full_name' => 'string|max:150',
      'address_line_1' => 'string|max:255',
      'address_line_2' => 'nullable|string|max:255',
      'city' => 'string|max:100',
      'state' => 'string|max:100',
      'country' => 'string|max:100',
      'postal_code' => 'string|max:50',
      'phone_number' => 'string|max:50',
      'is_default' => 'boolean'
    ]);

    DB::beginTransaction();

    try {
      $address = Address::findOrFail($id);

      if ($request->has('is_default') && $request->is_default) {
        Address::where('user_id', $address->user_id)
          ->where('is_default', true)
          ->update(['is_default' => false]);
      }

      $address->update($request->all());

      DB::commit();

      return response()->json($address);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => 'Failed to update address', 'error' => $e->getMessage()], 500);
    }
  }

  public function destroy($id)
  {
    $address = Address::findOrFail($id);
    $address->delete();

    return response()->json(null, 204);
  }
}
