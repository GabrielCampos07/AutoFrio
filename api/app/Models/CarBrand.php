<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CarBrand extends Model
{
    use HasFactory;

    protected $table = "car_brand";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name'
    ];

    /**
    * VALIDATIONS
    */

    /**
    * The validation to store a new car model.
    */
    public static function carBrandCreateValidation(Request $request) 
    {        
        
        return $request->validate([
            'name' => 'required|string|unique:car_brand,name'
        ]);
    }

    /**
    * The validation to update a car model.
    */
    public static function CarBrandUpdateValidation(Request $request) 
    {
        return $request->validate([
            'name' => 'string|unique:car_brand,name'
        ]);
        
    }

}
