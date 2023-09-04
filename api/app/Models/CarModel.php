<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CarModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand_id'
    ];

    protected $table = "car_model";

    /**
    * Return car brand
    */
    public function brand() {
        return $this->belongsTo(CarBrand::class);
    }

    /**
    * Return car brand
    */
    public function cars() {
        return $this->hasMany(Car::class);
    }


    /**
    * VALIDATIONS
    */

    /**
    * The validation to store a new car model.
    */
    public static function carModelCreateValidation(Request $request) 
    {        
        return $request->validate([
            'name' => 'required|string|unique:car_model,name',
            'brand_id' => 'required|integer|exists:car_brand,id'
        ]);
    }

    /**
    * The validation to update a car model.
    */
    public static function carModelEditValidation(Request $request) 
    {
        return $request->validate([
            'name' => 'string|unique:car_model,name',
            'brand_id' => 'integer|exists:car_brand,id'
        ]);
        
    }
}
