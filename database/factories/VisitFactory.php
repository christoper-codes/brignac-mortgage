<?php

namespace Database\Factories;

use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Visit>
 */
class VisitFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visitor_id' => fake()->uuid(),
            'path' => fake()->randomElement(['/', '/programs', '/apply', '/testimonials']),
            'ip_address' => fake()->ipv4(),
            'country_code' => 'US',
            'region_code' => 'LA',
            'region' => 'Louisiana',
            'city' => 'Baton Rouge',
            'device_type' => fake()->randomElement(['mobile', 'desktop', 'tablet']),
            'browser' => fake()->randomElement(['Chrome', 'Safari', 'Facebook App']),
            'os' => fake()->randomElement(['iOS', 'Android', 'Windows']),
            'created_at' => now(),
        ];
    }
}
