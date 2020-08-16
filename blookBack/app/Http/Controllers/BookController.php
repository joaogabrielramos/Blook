<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\BookRequest;
use App\Book;
use App\User;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function createBook(BookRequest $request)
    {
        $book = new Book();
        $book->createBook($request);
        return response()->json($book);
    }

    public function updateBook(BookRequest $request, $id)
    {
        $book = Book::findOrFail($id);
        $book->updateBook($request, $id);
        return response()->json($book);
    }

    public function showBook($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    public function listBooks()
    {
        $book = Book::all();
        return response()->json([$book]);
    }

    public function deleteBook($id)
    {
        $book = Book::find($id);

        if ($book->image)
            Storage::delete($book->image);

        Book::destroy($book->id);
        return response()->json(['Livro deletado']);
    }

    public function addUser($id, $user_id){
        $book = Book::findOrFail($id);
        $user = User::findOrFail($user_id);
        $book->user_id = $user_id;
        $book->save();
        return response()->json($book);
    }

    public function removeUser($id, $user_id){
        $book = Book::findOrFail($id);
        $user = User::findOrFail($user_id);
        $book->user_id = NULL;
        $book->save();
        return response()->json($book);
    }

    public function searchBookByName($name)
    {
        $query = Book::query();
        $query->where('name','LIKE','%'.$name.'%');

        return response()->json($query->get());
    }

    public function searchBookByAuthor($author)
    {
        $query = Book::query();
        $query->where('author','LIKE','%'.$author.'%');

        return response()->json($query->get());
    }
}
