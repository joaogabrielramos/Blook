<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Post;
use App\User;
use App\Book;
use App\Http\Resources\Users as UserResource;
use App\Http\Resources\Posts as PostResource;


class PostController extends Controller
{

    public function createPost(PostRequest $request, $user_id)
    {
        $post = new Post();
        $post->createPost($request);
        $post->addUser($post->id, $user_id);
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
        $post = Post::find($id);
        $user = User::find($post->user_id);

        return response()->json([
            'post' => $post,
            'user' => new UserResource($user)
        ]);
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

    public function listPostCards()
    {
        $posts = Post::all();

        $postResource = PostResource::collection($posts);
        //$postResource = new PostResource($posts);

        return response()->json($postResource);

    }
}
