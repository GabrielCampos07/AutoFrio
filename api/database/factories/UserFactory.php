<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    private $roles = ['admin', 'staff'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => $this->getRole(),
            'password' => bcrypt('123'),
            'remember_token' => Str::random(10),
        ];
    }

    private function getRole(): string
    {
        return fake()->randomElement($this->roles);
    }
}
