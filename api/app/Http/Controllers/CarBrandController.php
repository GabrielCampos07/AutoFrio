<?php

namespace App\Http\Controllers;

use App\Models\CarBrand;
use Illuminate\Http\Request;

class CarBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->name) {
            return CarBrand::where('car_brand.name', 'LIKE', '%'.$request->name.'%')->get();
        }

        return CarBrand::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = CarBrand::carBrandCreateValidation($request);
        $newCarBrand = CarBrand::Create($fields);

        if ($newCarBrand) {
            
            return $newCarBrand;
        }

        return response(['message' => 'Error to create car brand.'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $carBrand)
    {
        $carBrand = CarBrand::find($carBrand);

        if ($carBrand) {
            
            $carBrand->models;
            return $carBrand;
        }

        return response(['message' => 'Car brand not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $carBrand)
    {
        $carBrand = CarBrand::find($carBrand);
        $fields = CarBrand::carBrandUpdateValidation($request);

        if ($carBrand) {

            $carBrand->update($fields);
            return $carBrand;
        }

        return response(['message' => ' Error to update.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $carBrand)
    {
        if (CarBrand::destroy($carBrand)) {
            
            return response(['message' => 'Deleted with success.'], 200);
        }

        return response(['message' => 'Error to delete.'], 404);
    }
}
