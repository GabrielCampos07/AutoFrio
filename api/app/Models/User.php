<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed'
    ];


    /**
     * The validation to store a new user.
     *
     * @var array<string, string>
     */
    public static function userCreateValidation(Request $request) 
    {        
        return $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:usuarios',
            'password' => 'required|string|confirmed',
            'role' => 'in:admin,staff',
        ]);
    }

    /**
     * The validation to update a user.
     *
     * @var array<string, string>
     */
    public static function userUpdateValidation(Request $request) 
    {
        return $request->validate([
            'name' => 'string',
            'email' => 'string|unique:users',
            'password' => 'string',
            'role' => 'in:admin,staff',
        ]);
        
    }
}
