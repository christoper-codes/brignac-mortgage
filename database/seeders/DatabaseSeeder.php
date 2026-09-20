<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Only these emails can sign in (through Google). Add new team members here and re-run the seeder.
     */
    private const ALLOWED_USERS = [
        ['name' => 'Christoper Patiño', 'email' => 'christoper.patiho@gmail.com'],
    ];

    public function run(): void
    {
        foreach (self::ALLOWED_USERS as $allowed) {
            User::query()->firstOrCreate(
                ['email' => $allowed['email']],
                ['name' => $allowed['name'], 'password' => Str::random(40), 'email_verified_at' => now()],
            );
        }
    }
}
