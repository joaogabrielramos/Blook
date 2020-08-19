<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\User;
use Auth;
use App\Post;

class UserController extends Controller
{
    public function createUser(UserRequest $request)
    {
        $user = new User;
        $user->createUser($request);
        return response()->json($user);
    }

    public function updateUser(UserRequest $request)
    {
        $user = Auth::user();
        $user->updateUser($request);
        return response()->json($user);
    }

    public function showUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function listUsers()
    {
        $user = User::all();
        return response()->json([$user]);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        User::destroy($user->id);
        return response()->json(['Usuário deletado']);
    }

    public function searchUserByName($name)
    {
        $query = User::query();
        $query->where('name','LIKE','%'.$name.'%');

        return response()->json($query->get());
    }

    public function followUser($id)
    {
        $follower = Auth::user(); // Usuário que realiza a ação de seguir
        $followed = User::findOrFail($id); // Usuário que está sendo seguido

        if($followed->followers->contains($follower->id))
        {
            $followed->followers()->detach($follower->id);
            return response()->json(['Você deixou de seguir '. $followed->name]);
        }

        $followed->followers()->attach($follower->id);
        return response()->json(['Você agora está seguindo '. $followed->name]);
    }

    public function getFollowers($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->followers());
    }

    public function getFollowing($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->following());
    }

    public function likePost($id)
    {
        $user = Auth::user(); // Usuário que realiza a ação de curtir
        $post = Post::findOrFail($id); // Post que está sendo curtido

        if($post->users->contains($user->id))
        {
            $post->users()->detach($user->id);
            return response()->json(['Você discurtiu esse post']);
        }

        $post->users()->attach($user->id);
        return response()->json(['Você curtiu esse post']);
    }
}
