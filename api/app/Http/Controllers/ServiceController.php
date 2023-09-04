<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Service::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = Service::serviceCreateValidation($request);
        $newService = Service::Create($fields);
        if ($newService) {
            return $newService;
        }

        return response(['message' => 'Error to create.'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $service)
    {
        $service = Service::find($service);
        if ($service) {
            
            return $service;
        }

        return response(['message' => 'Service not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $service)
    {
        $service = Service::find($service);
        if ($service) {
            $service->update($request->all());

            return $service;
        }

        return response(['message' => 'Error to update.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $service)
    {
        if (Service::destroy($service)) {
            return response(['message' => 'Deleted with success.'], 200);
        }

        return response(['message' => 'Error to delete.'], 404);
    }
}
