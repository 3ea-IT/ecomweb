<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use App\Models\Address;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone', // Ensure phone is fillable
        'password_hash',
        'user_role_id',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    /**
     * Remove password casts since we don't have a 'password' column.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Tell Laravel which attribute to use as the password for authentication.
     */
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    /**
     * Optional: If you want to automatically hash passwords when setting them,
     * you can define a mutator like this:
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password_hash'] = Hash::make($value);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id', 'user_id');
    }
}
