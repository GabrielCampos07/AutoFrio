<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Car::with('brand','model')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = Car::carCreateValidation($request);
        $newCar = Car::Create($fields);

        if ($newCar) {
            
            return $newCar;
        }

        return response(['message' => 'Error to create car.'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $car)
    {
        $car = Car::find($car);

        if ($car) {
            
            $car->brand;
            $car->model;
            return $car;
        }

        return response(['message' => 'Car not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $car)
    {
        $car = Car::find($car);
        $fields = Car::carUpdateValidation($request);

        if ($car) {

            $car->update($fields);
            return $car;
        }

        return response(['message' => 'Error to update.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $carBrand)
    {
        if (Car::destroy($carBrand)) {
            
            return response(['message' => 'Deleted with success.'], 200);
        }

        return response(['message' => 'Error to delete.'], 404);
    }
}
