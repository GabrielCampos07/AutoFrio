<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
/**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Customer::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = Customer::customerCreateValidation($request);
        $newCustomer = Customer::Create($fields);

        if ($newCustomer) {
            return $newCustomer;
        }

        return response(['message' => 'Error to create.'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $customer)
    {
        $customer = Customer::find($customer);

        if ($customer) {
            
            return $customer;
        }

        return response(['message' => 'Service not found.'], 404);
    }

    /** 
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $customer)
    {
        $customer = Customer::find($customer);
        $fields = Customer::customerUpdateValidation($request);

        if ($customer) {

            $customer->update($fields);
            return $customer;
        }

        return response(['message' => 'Error to update.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $customer)
    {
        if (Customer::destroy($customer)) {
            return response(['message' => 'Deleted with success.'], 200);
        }

        return response(['message' => 'Error to delete.'], 404);
    }
}
