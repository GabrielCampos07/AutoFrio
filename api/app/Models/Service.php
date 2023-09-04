<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Service extends Model
{
    use HasFactory;

    protected $table = 'service';

    protected $fillable = [
        'name'
    ];

    /**
    * VALIDATIONS
    */

    /**
    * The validation to store a new service.
    */
    public static function serviceCreateValidation(Request $request) 
    {        
        
        return $request->validate([
            'name' => 'required|string|unique:service,name'
        ]);
    }

    /**
    * The validation to update a service.
    */
    public static function serviceUpdateValidation(Request $request) 
    {
        return $request->validate([
            'name' => 'string|unique:service,name'
        ]);
        
    }
}
