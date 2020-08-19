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
    //ROTAS DE USUARIO
    Route::GET('logout', 'API\PassportController@logout');
    Route::GET('getDetails', 'API\PassportController@getDetails');
    Route::GET('getFollowers/{id}','UserController@getFollowers');
    Route::GET('getFollowing/{id}','UserController@getFollowing');
    Route::GET('followUser/{id}','UserController@followUser');
    Route::GET('likePost/{id}','UserController@likePost');
    Route::GET('showUser/{id}','UserController@showUser');
    Route::PUT('updateUser','UserController@updateUser');
    Route::DELETE('deleteUser/{id}','UserController@deleteUser');
    Route::GET('listUsers','UserController@listUsers');

    //ROTAS DE LIVRO
    Route::POST('createBook','BookController@createBook');
    Route::PUT('updateBook/{id}','BookController@updateBook');
    Route::DELETE('deleteBook/{id}','BookController@deleteBook');

    //ROTAS DE POST
    Route::GET('listFollowingPosts','PostController@listFollowingPosts');
    Route::POST('createPost','PostController@createPost');
    Route::PUT('updatePost/{id}','PostController@updatePost');
    Route::DELETE('deletePost/{id}','PostController@deletePost');

    //ROTAS DE COMENTÁRIO
    Route::POST('createComment/{post_id}','CommentController@createComment');
    Route::PUT('updateComment/{id}','CommentController@updateComment');
    Route::DELETE('deleteComment/{id}','CommentController@deleteComment');
});


//ROTAS DE USUARIO
Route::GET('searchUserByName/{name}','UserController@searchUserByName');

Route::POST('createUser','UserController@createUser');


//ROTAS DE LIVRO
Route::GET('showBook/{id}','BookController@showBook');
Route::GET('listBooks','BookController@listBooks');
Route::GET('searchBookByName/{name}','BookController@searchBookByName');
Route::GET('searchBookByAuthor/{author}','BookController@searchBookByAuthor');

Route::PUT('addUser/{id}/{user_id}', 'BookController@addUser');
Route::PUT('removeUser/{id}/{user_id}', 'BookController@removeUser');


//ROTAS DE POST
Route::GET('showPost/{id}','PostController@showPost');
Route::GET('listPosts','PostController@listPosts');
Route::GET('listPostCards','PostController@listPostCards');
Route::GET('listUserPosts/{id}','PostController@listUserPosts');

Route::PUT('addUser/{id}/{user_id}', 'PostController@addUser');
Route::PUT('removeUser/{id}/{user_id}', 'PostController@removeUser');
Route::PUT('addBook/{id}/{book_id}', 'PostController@addBook');
Route::PUT('removeBook/{id}/{book_id}', 'PostController@removeBook');


//ROTAS DE COMENTÁRIO
Route::GET('showComment/{id}','CommentController@showComment');
Route::GET('listComments/{post_id}','CommentController@listComments');

Route::PUT('addUser/{id}/{user_id}', 'CommentController@addUser');
Route::PUT('removeUser/{id}/{user_id}', 'CommentController@removeUser');
Route::PUT('addPost/{id}/{post_id}', 'CommentController@addPost');
Route::PUT('removePost/{id}/{post_id}', 'CommentController@removePost');
