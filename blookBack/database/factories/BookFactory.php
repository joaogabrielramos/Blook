<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'author' => $faker->name,
        'image' => $faker->imageUrl($width = 640, $height = 480),
        'text' => $faker->text,
    ];
});
