<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Http\Requests\CommentRequest;
use App\User;
use App\Post;

class CommentController extends Controller
{
    public function createComment(CommentRequest $request)
    {
        $comment = new Comment();
        $comment->createComment($request);
        return response()->json($comment);
    }

    public function updateComment(CommentRequest $request, $id)
    {
        $comment = Comment::find($id);
        $comment->updateComment($request);
        return response()->json($comment);
    }

    public function showComment($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    public function listComments()
    {
        $comment = Comment::all();
        return response()->json([$comment]);
    }

    public function deleteComment($id)
    {
        $comment = Comment::find($id);
        Comment::destroy($comment->id);
        return response()->json(['Comentário deletado']);
    }

    public function addUser($id, $user_id){
        $comment = Comment::findOrFail($id);
        $user = User::findOrFail($user_id);
        $comment->user_id = $user_id;
        $comment->save();
        return response()->json($comment);
    }

    public function removeUser($id, $user_id){
        $comment = Comment::findOrFail($id);
        $user = User::findOrFail($user_id);
        $comment->user_id = NULL;
        $comment->save();
        return response()->json($comment);
    }

    public function addPost($id, $post_id){
        $comment = Comment::findOrFail($id);
        $post = Post::findOrFail($post_id);
        $comment->post_id = $post_id;
        $comment->save();
        return response()->json($comment);
    }

    public function removePost($id, $post_id){
        $comment = Comment::findOrFail($id);
        $post = User::findOrFail($post_id);
        $comment->post_id = NULL;
        $comment->save();
        return response()->json($comment);
    }
}
