<?php

namespace Database\Factories;

use App\Enums\CampaignPlatform;
use App\Enums\CampaignStatus;
use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(3, true),
            'code' => fake()->unique()->slug(2),
            'platform' => fake()->randomElement(CampaignPlatform::cases()),
            'status' => CampaignStatus::Active,
            'budget_cents' => fake()->numberBetween(20000, 500000),
        ];
    }
}
