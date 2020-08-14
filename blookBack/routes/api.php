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

//PASSPORT ROUTES
Route::POST('register', 'API\PassportController@register');
Route::POST('login', 'API\PassportController@login');

Route::GROUP(['middleware'=>'auth:api'], function (){
    Route::GET('logout', 'API\PassportController@logout');
    Route::POST('getDetails', 'API\PassportController@getDetails');
});


//ROTAS DE USUARIO
Route::GET('showUser/{id}','UserController@showUser');
Route::GET('listUsers','UserController@listUsers');
Route::POST('createUser','UserController@createUser');
Route::PUT('updateUser/{id}','UserController@updateUser');
Route::DELETE('deleteUser/{id}','UserController@deleteUser');


//ROTAS DE LIVRO
Route::GET('showBook/{id}','BookController@showBook');
Route::GET('listBooks','BookController@listBooks');
Route::POST('createBook','BookController@createBook');
Route::PUT('updateBook/{id}','BookController@updateBook');
Route::DELETE('deleteBook/{id}','BookController@deleteBook');

Route::put('addUser/{id}/{user_id}', 'BookController@addUser');
Route::put('removeUser/{id}/{user_id}', 'BookController@removeUser');


//ROTAS DE POST
Route::GET('showPost/{id}','PostController@showPost');
Route::GET('listPosts','PostController@listPosts');
Route::POST('createPost','PostController@createPost');
Route::PUT('updatePost/{id}','PostController@updatePost');
Route::DELETE('deletePost/{id}','PostController@deletePost');

Route::put('addUser/{id}/{user_id}', 'PostController@addUser');
Route::put('removeUser/{id}/{user_id}', 'PostController@removeUser');
Route::put('addBook/{id}/{book_id}', 'PostController@addBook');
Route::put('removeBook/{id}/{book_id}', 'PostController@removeBook');
