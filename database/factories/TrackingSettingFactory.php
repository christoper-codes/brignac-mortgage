<?php

namespace Database\Factories;

use App\Models\TrackingSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrackingSetting>
 */
class TrackingSettingFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meta_pixel_id' => (string) fake()->numerify('###############'),
            'tiktok_pixel_id' => strtoupper(fake()->bothify('C?#?#?#?#?#?#?#?#?#?#?#')),
            'google_analytics_id' => 'G-'.strtoupper(fake()->bothify('??########')),
        ];
    }
}
