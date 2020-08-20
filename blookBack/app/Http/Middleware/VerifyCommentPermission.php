<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Comment;

class VerifyCommentPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        $comment = Comment::findOrFail($request->id);

        if( $user->is_admin || $comment->user_id == $user->id )
            return $next($request);
        else
            return response()->json(['Impossível realizar essa ação']);
    }
}
