<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\CommentRequest;

class Comment extends Model
{
    public function createComment(CommentRequest $request)
    {
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
