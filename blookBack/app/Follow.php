<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    public function newFollow($follower_id, $followed_id)
    {
        /*$follow = new Follow;

        $follow->follower = $follower_id;
        $follow->followed = $followed_id;
        $follow->save();
        return response()->json($follow, 200);*/
    }
}
