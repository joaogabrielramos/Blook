<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Http\Requests\UserRequest;
use Laravel\Passport\HasApiTokens;
use App\Book;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function registerBooks() // cadastrar livros
    {
        return $this->hasMany('App\Book');
    }

    public function createPosts() // criar posts
    {
        return $this->hasMany('App\Post');
    }

    public function favoriteBooks() // estante de livros
    {
        return $this->belongsToMany('App\Book');
    }

    public function followers() // usuarios seguidores
    {
        return $this->hasMany('App\User');
    }

    public function followed() // usuarios seguindo
    {
        return $this->hasMany('App\User');
    }

    public function createUser(UserRequest $request)
    {
        $this->name = $request->name;
        $this->email = $request->email;
        $this->password = bcrypt($request->password);
        $this->phone_number = $request->phone_number;
        $this->date_of_birth = $request->date_of_birth;
        $this->genre = $request->genre;
        $this->is_admin = $request->is_admin;

        $this->save();

        if ($request->profile_pic) {
            if (!Storage::exists('localUserImages/'))
                Storage::makeDirectory('localUserImages/', 0775, true);

            $file = $request->file('profile_pic');
            $filename = $this->id.'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('localUserImages', $filename);
            $this->profile_pic = $path;
        }

        $this->save();
    }

    public function updateUser(UserRequest $request)
    {
        //TALVEZ ADICIONAR SENHA
        if ($request->name)
            $this->name = $request->name;
        if ($request->email)
            $this->email = $request->email;
        if ($request->phone_number)
            $this->phone_number = $request->phone_number;
        if ($request->date_of_birth)
            $this->date_of_birth = $request->date_of_birth;
        if ($request->genre)
            $this->genre = $request->genre;

        $this->save();
    }
}
