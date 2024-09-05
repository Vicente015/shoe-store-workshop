<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "{$this->faker->colorName()} {$this->faker->words(2, true)}",
            'price' => $this->faker->randomNumber(2) + 0.99,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
