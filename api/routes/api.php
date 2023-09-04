<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarBrandController;
use App\Http\Controllers\CarModelController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['middleware' => ['json.response']], function() {
    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::apiResources([
            '/car/brand' => CarBrandController::class,
            '/car/model' => CarModelController::class,
        ]);
        
        Route::post('/logout', [ AuthController::class, 'logout']);
    });
    
    Route::post('/register', [ AuthController::class, 'register']);
    Route::post('/login', [ AuthController::class, 'login']);
    
});


