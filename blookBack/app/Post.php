<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\Book;
use Auth;

class Post extends Model
{
    public function user() // Usuário que criou o post
    {
        return $this->belongsTo('App\User');
    }

    public function book() // livro relativo ao post
    {
        return $this->belongsTo('App\Book');
    }

    public function comments() // comentarios relativos ao post
    {
        return $this->hasMany('App\Comment');
    }

    public function users() // usuários que curtiram o post
    {
        return $this->belongsToMany('App\User', 'posts_users', 'post_id', 'user_id');
    }

    public function createPost(PostRequest $request)
    {
        $user = Auth::user();
        $this->user_id = $user->id;

        $this->title = $request->title;
        $this->text = $request->text;
        $this->post_type = $request->post_type;

        $this->save();

        if ($request->image) {
            if (!Storage::exists('localPostImages/'))
                Storage::makeDirectory('localPostImages/', 0775, true);

            $file = $request->file('image');
            $filename = $this->id.'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('localPostImages', $filename);
            $this->image = $path;
        }

        $this->save();
    }

    public function updatePost(Request $request)
    {
        if ($request->title)
            $this->title = $request->title;
        if ($request->text)
            $this->text = $request->text;

        if ($request->image) {

            if (!Storage::exists('localPostImages/'))
                Storage::makeDirectory('localPostImages/', 0775, true);

            $post = Post::find($this->id);
            if ($post->image)
                Storage::delete($post->image);

            $file = $request->file('image');
            $filename = $this->id . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('localPostImages', $filename);
            $this->image = $path;
        }

        $this->save();
    }

    public function addUser($id, $user_id){
        $post = Post::findOrFail($id);
        $user = User::findOrFail($user_id);
        $post->user_id = $user_id;
        $post->save();
        return response()->json($post);
    }

    public function removeUser($id, $user_id){
        $post = Post::findOrFail($id);
        $user = User::findOrFail($user_id);
        $post->user_id = NULL;
        $post->save();
        return response()->json($post);
    }

    public function addBook($id, $book_id){
        $post = Post::findOrFail($id);
        $book = Book::findOrFail($book_id);
        $post->book_id = $book_id;
        $post->save();
        return response()->json($post);
    }

    public function removeBook($id, $book_id){
        $post = Post::findOrFail($id);
        $book = Book::findOrFail($book_id);
        $post->book_id = NULL;
        $post->save();
        return response()->json($post);
    }
}
