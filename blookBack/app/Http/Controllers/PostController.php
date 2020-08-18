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

    public function createPost(PostRequest $request)
    {
        $post = new Post();
        $post->createPost($request);
        return response()->json($post);
    }

    public function updatePost(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->updatePost($request);
        return response()->json($post);
    }

    public function showPost($id)
    {
        $post = Post::findOrFail($id);
        $user = User::findOrFail($post->user_id);

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

    public function listPostCards()
    {
        $posts = Post::all();
        $postResource = PostResource::collection($posts);
        return response()->json($postResource);
    }
}
