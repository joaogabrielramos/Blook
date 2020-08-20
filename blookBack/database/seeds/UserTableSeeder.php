<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 5)->create()->each(function ($user) {
            $books = factory(App\Book::class,2)->make();
            $posts = factory(App\Post::class,2)->make();
            $comments = factory(App\Comment::class,2)->make();

            //User post Comment 1-n
            $user->comments()->saveMany($comments);

            //User have Books 1-n
            $user->registredBooks()->saveMany($books);

            //User post Post 1-n
            $user->createdPosts()->saveMany($posts);

            //User like Post
            $user->likedPosts()->attach($posts);

            //User follow User n-n
            $user->following()->attach(User::all()->random()->id);
          });
    }
}
