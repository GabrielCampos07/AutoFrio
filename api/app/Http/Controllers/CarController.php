<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request)
    {
        return Car::select(
                "car.id",
                "car_model.name as model",
                "car_brand.name as brand",
                "car.license_plate",
                "car.year",
                "car.mileage",
                "car.color",
                "car.created_at",
                "car.updated_at"
            )
            ->join('car_model', 'car.model_id', '=', 'car_model.id')
            ->join('car_brand', 'car.brand_id', '=', 'car_brand.id')
            ->when(
                $request->searchTerm,
                function (Builder $builder) use ($request) {
                    $builder->where('car.license_plate', 'LIKE','%'.$request->searchTerm.'%')
                        ->orWhere('car.color', 'LIKE','%'.$request->searchTerm.'%')
                        ->orWhere('car_model.name', 'LIKE','%'.$request->searchTerm.'%')
                        ->orWhere('car_brand.name', 'LIKE','%'.$request->searchTerm.'%');
                }
            )
            ->get();
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
    public function show(Request $request, string $car)
    {
        $selectedCar = Car::select(
                "car.id",
                "car_model.name as model",
                "car_brand.name as brand",
                "car.license_plate",
                "car.year",
                "car.mileage",
                "car.color",
                "car.created_at",
                "car.updated_at"
            )
            ->join('car_model', 'car.model_id', '=', 'car_model.id')
            ->join('car_brand', 'car.brand_id', '=', 'car_brand.id')
            ->where('car.id', '=', $car)
            ->get();

        if ($selectedCar) {
            return $selectedCar;
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
