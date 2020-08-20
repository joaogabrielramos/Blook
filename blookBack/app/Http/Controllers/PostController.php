<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Storage;
use App\Post;
use App\User;
use App\Book;
use Auth;
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

    public function showPost($id, $user_id)
    {
        $post = Post::find($id);
        $user = User::find($post->user_id);
        $liked = false;

        if($user_id != 0) // Caso o user_id seja zero, o usuário não está logado
        {
            $authUser = User::find($user_id);

            if($post->users->contains($authUser->id))
                $liked = true;
        }

        return response()->json([
            'post' => $post,
            'liked' => $liked,
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
        $posts = Post::orderBy('id', 'desc')->get();
        $postResource = PostResource::collection($posts);

        return response()->json($postResource);
    }

    public function listFollowingPosts()
    {
        $user = Auth::user();
        $users_id = $user->following->pluck('id');
        $posts = Post::orderBy('id', 'desc')->whereIn('user_id', $users_id)->get();
        $postResource = PostResource::collection($posts);

        return response()->json($postResource);
    }

    public function listUserPosts($id)
    {
        $user = User::findOrFail($id);
        $posts = $user->createdPosts()->orderBy('id', 'desc')->get();
        $postResource = PostResource::collection($posts);

        return response()->json([$postResource]);
    }
}
