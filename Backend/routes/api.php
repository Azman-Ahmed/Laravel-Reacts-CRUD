<?php

use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get("tada/{id?}", [DataController::class, 'get_data']);
Route::post("add", [DataController::class, 'add']);
Route::put('/update/{id}', [DataController::class, 'update']);
Route::get('search/{name}', [DataController::class, 'search']);
Route::delete('delete/{id}', [DataController::class, 'delete']);



