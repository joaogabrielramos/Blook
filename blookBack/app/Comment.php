<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\CommentRequest;
use Auth;

class Comment extends Model
{
    public function createComment(CommentRequest $request, $post_id)
    {
        $user = Auth::user();
        $this->user_id = $user->id;
        $this->post_id = $post_id;

        $this->text = $request->text;
        $this->save();
    }

    public function updateComment(CommentRequest $request)
    {
        if ($request->text)
            $this->text = $request->text;
        $this->save();
    }
}
