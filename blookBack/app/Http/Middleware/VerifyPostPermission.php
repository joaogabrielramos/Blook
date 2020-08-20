<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Post;

class VerifyPostPermission
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
        $post = Post::findOrFail($request->id);

        if( $user->is_admin || $post->user_id == $user->id )
            return $next($request);
        else
            return response()->json(['Impossível realizar essa ação']);
    }
}
