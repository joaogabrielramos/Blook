<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\User;

class VerifyUserPermission
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
        $authUser = Auth::user();
        $user = User::findOrFail($request->id);

        if( $authUser->is_admin || $user->id == $authUser->id )
            return $next($request);
        else
            return response()->json(['Impossível realizar essa ação']);
    }
}
