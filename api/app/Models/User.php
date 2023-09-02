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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cargo'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'senha',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'senha' => 'hashed'
    ];


    /**
     * The validation to store a new user.
     *
     * @var array<string, string>
     */
    public static function validacaoCriacaoUsuarios(Request $request) 
    {        
        return $request->validate([
            'nome' => 'required|string',
            'email' => 'required|string|unique:usuarios',
            'senha' => 'required|string|confirmed',
            'cargo' => 'in:admin,staff',
        ]);
    }

    /**
     * The validation to update a user.
     *
     * @var array<string, string>
     */
    public static function validacaoEdicaoUsuarios(Request $request) 
    {
        return $request->validate([
            'nome' => 'string',
            'email' => 'string|unique:users',
            'senha' => 'string',
            'cargo' => 'in:admin,staff',
        ]);
        
    }
}
