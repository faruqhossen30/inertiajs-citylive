<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\RtctokenController;
use App\Http\Controllers\Api\RtmctokenController;
use App\Http\Controllers\Api\UserApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthApiController::class, 'register']);
Route::get('/rcttoken/host', [RtctokenController::class, 'generate']);
Route::get('/rtmtoken/host', [RtmctokenController::class, 'generate']);

Route::post('user/avatar/{uid}', [UserApiController::class, 'avatar']);
