<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory (App\User::class,20)->create()->each(function ($user) {
            $book = factory(App\Book::class, 2)->make();
            $post = factory(App\Post::class, 2)->make()->each(function ($post) {
                $comment = factory(App\Comment::class, 2)->make();
                $post->comments()->saveMany($comment);
            });
            $user->registredBooks()->saveMany($book);
            $user->createdPosts()->saveMany($post);
        });
    }
}
