<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Car extends Model
{
    use HasFactory;

    protected $table = 'car';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'model_id',
        'brand_id',
        'license_plate',
        'year',
        'mileage',
        'color'
    ];

    /**
    * Return car brand
    */
    public function brand() {
        return $this->belongsTo(CarBrand::class);
    }

    /**
    * Return car model
    */
    public function model() {
        return $this->belongsTo(CarModel::class);
    }


    /**
    * VALIDATIONS
    */

    /**
    * The validation to store a new car model.
    */
    public static function carCreateValidation(Request $request) 
    {        
        return $request->validate([
            'model_id' => 'required|integer|exists:car_model,id',
            'brand_id' => 'required|integer|exists:car_brand,id',
            'license_plate' => 'required|string|unique:car,license_plate',
            'year' => 'required|integer',
            'mileage' => 'required|integer',
            'color' => 'required|string'
        ]);
    }

    /**
    * The validation to update a car model.
    */
    public static function carUpdateValidation(Request $request) 
    {
        return $request->validate([
            'model_id' => 'integer|exists:car_model,id',
            'brand_id' => 'integer|exists:car_brand,id',
            'license_plate' => 'string|unique:car,license_plate',
            'year' => 'integer',
            'mileage' => 'integer',
            'color' => 'string'
        ]);
        
    }
}
