<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//ROTAS DE USUARIO
Route::GET('showUser/{id}','UserController@showUser');
Route::GET('listUsers','UserController@listUsers');
Route::POST('createUser','UserController@createUser');
Route::PUT('updateUser/{id}','UserController@updateUser');

