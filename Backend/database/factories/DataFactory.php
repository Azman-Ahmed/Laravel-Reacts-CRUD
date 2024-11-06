<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Data>
 */
class DataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3), // Generates a short sentence for the note name
            'description' => fake()->paragraph(), // Generates a paragraph for the description
            'creator' => fake()->name(), // Generates a name for the creator
            'creator_type' => fake()->randomElement(['user', 'admin']), // Randomly selects creator type
            'status' => fake()->randomElement(['pending', 'completed', 'in-progress']), // Randomly selects status
        ];
    }
}
