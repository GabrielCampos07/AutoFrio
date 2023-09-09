<?php

namespace App\Http\Controllers;

use App\Models\CarModel;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class CarModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if ( $request->name || $request->brandID ) {
            return CarModel::select(
                "car_model.id",
                "car_model.name as model",
                "car_brand.name as brand",
                "car_model.created_at",
                "car_model.updated_at"
            )
            ->join('car_brand', 'car_model.brand_id', '=', 'car_brand.id')
            ->when(
                $request->name, function (Builder $builder) use ($request) {
                    $builder->where('car_model.name', 'LIKE','%'.$request->name.'%');
                }
            )
            ->when(
                $request->brandID, function (Builder $builder) use ($request) {
                    $builder->where('car_model.brand_id', '=', $request->brandID);
                }
            )
            ->get();
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
        $selectedCarModel = CarModel::select(
                "car_model.id",
                "car_model.name as model",
                "car_brand.name as brand",
                "car_model.created_at",
                "car_model.updated_at"
            )
            ->join('car_brand', 'car_model.brand_id', '=', 'car_brand.id')
            ->where('car_model.id', '=', $carModel)
            ->get();

        if ($selectedCarModel) {
            return $selectedCarModel;
        }

        return response(['message' => 'Car model not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $carModel)
    {
        $carModel = CarModel::find($carModel);
        $fields = CarModel::carModelUpdateValidation($request);

        if ($carModel) {
            $carModel->update($fields);

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
