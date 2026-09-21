<?php

namespace Database\Factories;

use App\Models\CtaClick;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CtaClick>
 */
class CtaClickFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visitor_id' => fake()->uuid(),
            'label' => fake()->randomElement(['Get Pre-Qualified', 'Apply Now', 'Call']),
            'target' => '/apply',
            'path' => '/',
            'created_at' => now(),
        ];
    }
}
