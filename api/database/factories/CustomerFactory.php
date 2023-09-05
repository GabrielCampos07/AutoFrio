<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'document' => fake()->unique()->numerify('############'),
            'phone' => fake()->numerify('##########'),
            'phone_2' => fake()->numerify('##########'),
            'email' => fake()->unique()->safeEmail(),
            'street' => fake()->streetName(),
            'neighborhood' => fake()->address(),
            'house_number' => fake()->buildingNumber(),
            'cep' => fake()->buildingNumber(),
            'city' => fake()->city(),
            'state' => fake()->city(),
        ];
    }
}
