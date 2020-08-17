<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\User;
use App\Book;

class Post extends Model
{
    public function user() // Usuário que criou o post
    {
        return $this->belongsTo('App\User');
    }

    public function book() // cadastrar livros
    {
        return $this->belongsTo('App\Book');
    }

    public function createPost(PostRequest $request)
    {
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

    public function updatePost(PostRequest $request, $id)
    {
        if ($request->title)
            $this->title = $request->title;
        if ($request->text)
            $this->text = $request->text;

        if ($request->image) {

            if (!Storage::exists('localPostImages/'))
                Storage::makeDirectory('localPostImages/', 0775, true);

            $post = Post::find($id);
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
}
