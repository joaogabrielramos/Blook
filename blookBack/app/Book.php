<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\BookRequest;
use Illuminate\Support\Facades\Storage;
use App\User;


class Book extends Model
{
    public function user() // Usuário que registrou o livro
    {
        return $this->belongsTo('App\User');
    }

    public function favoriteUsers() // Usuários que favoritaram o livro
    {
        return $this->belongsToMany('App\User');
    }

    public function posts() // Posts que contém o livro
    {
        return $this->hasMany('App\Post');
    }

    public function createBook(BookRequest $request)
    {
        $this->name = $request->name;
        $this->author = $request->author;
        $this->text = $request->text;

        $this->save();

        if ($request->image) {
            if (!Storage::exists('localBookImages/'))
                Storage::makeDirectory('localBookImages/', 0775, true);

            $file = $request->file('image');
            $filename = $this->id.'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('localBookImages', $filename);
            $this->image = $path;
        }

        $this->save();
    }

    public function updateBook(BookRequest $request, $id)
    {
        if ($request->name)
            $this->name = $request->name;
        if ($request->author)
            $this->author = $request->author;
        if ($request->text)
            $this->text = $request->text;

        if ($request->image) {

            if (!Storage::exists('localBookImages/'))
                Storage::makeDirectory('localBookImages/', 0775, true);

            $book = Book::find($id);
            if ($book->image){
                Storage::delete($book->image);
                $book->save();
            }

            $file = $request->file('image');
            $filename = $this->id . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('localBookImages', $filename);
            $this->image = $path;
        }

        $this->save();
    }
}
