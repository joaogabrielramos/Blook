<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\User;
use Auth;
use App\Follow;

class UserController extends Controller
{
    public function createUser(UserRequest $request)
    {
        $user = new User;
        $user->createUser($request);
        return response()->json($user);
    }

    public function updateUser(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);
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
        $follower = Auth::user();
        $followed = User::findOrFail($id);

        $follow = new Follow;
        $follow->follower = $follower->id;
        $follow->followed = $followed->id;
        $follow->save();

        return response()->json($follow, 200);
    }

    public function unFollowUser($id)
    {
        $follower = Auth::user();
        $followed = User::findOrFail($id);

        $follow = Follow::where('follower', '=', $follower->id)->get();

        $follow->delete();

        return response()->json($follow, 200);
    }

    public function getfollowers($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user->followers());
    }

    public function getfollowing($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->following());
    }
}
