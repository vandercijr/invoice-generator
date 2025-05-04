<?php
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
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
Route::post('/invoice/send', [InvoiceController::class, 'send']);
//->middleware(['throttle:6,1', 'sanitize']);

Route::fallback(function () {
    return response()->json(['message' => 'Invalid Resource'], 404);
});

