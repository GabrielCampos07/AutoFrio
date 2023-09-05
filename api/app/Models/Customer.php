<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'document',
        'phone',
        'phone_2',
        'email',
        'street',
        'neighborhood',
        'house_number',
        'cep',
        'city',
        'state'
    ];

    /**
    * Return OS 
    */
    // public function brand() {
    //     return $this->belongsTo(CarBrand::class);
    // }


    /**
    * VALIDATIONS
    */

    /**
    * The validation to store a new car model.
    */
    public static function customerCreateValidation(Request $request) 
    {        
        return $request->validate([
            'name' => 'required|string',
            'document' => 'required|integer|unique:custumer,document',
            'phone' => 'required|integer',
            'phone_2' => 'required|integer',
            'email' => 'required|email|unique:usuarios',
            'street' => 'required|string',
            'neighborhood' => 'required|string',
            'house_number' => 'required|integer',
            'cep' => 'required|integer',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);
    }

    /**
    * The validation to update a car model.
    */
    public static function customerUpdateValidation(Request $request) 
    {
        return $request->validate([
            'name' => 'string',
            'document' => 'integer|unique:custumer,document',
            'phone' => 'integer',
            'phone_2' => 'integer',
            'email' => 'email|unique:usuarios',
            'street' => 'string',
            'neighborhood' => 'string',
            'house_number' => 'integer',
            'cep' => 'integer',
            'city' => 'string',
            'state' => 'string',
        ]);
        
    }
}
