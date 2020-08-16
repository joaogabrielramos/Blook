<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\User;

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
}
