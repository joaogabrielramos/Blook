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
            $user->registerBooks()->saveMany($book);
        });
    }
}