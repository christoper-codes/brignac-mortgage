<?php

namespace Database\Factories;

use App\Enums\LeadStatus;
use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visitor_id' => fake()->uuid(),
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => '504-555-0123',
            'message' => fake()->sentence(),
            'sms_consent_at' => now(),
            'status' => LeadStatus::New,
            'country_code' => 'US',
            'region_code' => 'LA',
            'region' => 'Louisiana',
            'city' => 'New Orleans',
            'device_type' => 'mobile',
            'browser' => 'Safari',
            'os' => 'iOS',
        ];
    }
}
