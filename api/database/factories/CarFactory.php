<?php

namespace Database\Factories;

use App\Models\CarBrand;
use App\Models\CarModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model_id' => $this->faker->randomElement(CarModel::all())['id'],
            'brand_id' => $this->faker->randomElement(CarBrand::all())['id'],
            'license_plate' => Str::random(10),
            'year' => 2010,
            'mileage' => 20000,
            'color' => Str::random(10)
        ];
    }
}
