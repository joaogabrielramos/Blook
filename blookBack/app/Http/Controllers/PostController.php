<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Post;
use App\User;
use App\Book;

class PostController extends Controller
{
    public function createPost(PostRequest $request)
    {
        $post = new Post();
        $post->createPost($request);
        return response()->json($post);
    }

    public function updatePost(PostRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->updatePost($request);
        return response()->json($post);
    }

    public function showPost($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    public function listPosts()
    {
        $post = Post::all();
        return response()->json([$post]);
    }

    public function deletePost($id)
    {
        $post = Post::find($id);

        if ($post->image)
            Storage::delete($post->image);

        Post::destroy($post->id);
        return response()->json(['Post deletado']);
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
