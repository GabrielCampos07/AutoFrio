<?php

namespace App\Http\Controllers;

use App\Models\CarModel;
use Illuminate\Http\Request;

class CarModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brandID = request('brandID');
        if ($brandID) {
            return CarModel::where('brand_id','=', $brandID)->get();
        }

        return CarModel::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = CarModel::carModelCreateValidation($request);
        $newCarModel = CarModel::Create($fields);
        if ($newCarModel) {
            return $newCarModel;
        }

        return response(['message' => 'Error to create car model.'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $carModel)
    {
        $carModel = CarModel::find($carModel);
        if ($carModel) {
            $carModel->brand;
            
            return $carModel;
        }

        return response(['message' => 'Car model not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $carModel)
    {
        $carModel = CarModel::find($carModel);
        if ($carModel) {
            $carModel->update($request->all());

            return $carModel;
        }

        return response(['message' => 'Error to update the car model.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $carModel)
    {
        if (CarModel::destroy($carModel)) {
            return response(['message' => 'Deleted with success.'], 200);
        }

        return response(['message' => 'Error to delete the car model.'], 404);
    }
}
