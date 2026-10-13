<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Only these emails can sign in. Add new team members here and re-run the seeder. The owner
     * also sees the Users page (who has signed in, and when); everyone else is an admin. Each
     * person can change their own email and password from /settings/profile and /settings/security
     * after their first login.
     */
    private const ALLOWED_USERS = [
        ['name' => 'Christoper Patiño', 'email' => 'christoper.patiho@gmail.com', 'password' => 'BM123456!', 'role' => UserRole::Owner],
        ['name' => 'Shaun Brignac', 'email' => 'shaun@brignacmortgage.com', 'password' => 'BM123456!', 'role' => UserRole::Admin],
    ];

    public function run(): void
    {
        foreach (self::ALLOWED_USERS as $allowed) {
            $user = User::query()->firstOrCreate(
                ['email' => $allowed['email']],
                ['name' => $allowed['name'], 'password' => $allowed['password'], 'email_verified_at' => now()],
            );

            // firstOrCreate leaves existing users alone, so keep their role in step with this list.
            if ($user->role !== $allowed['role']) {
                $user->forceFill(['role' => $allowed['role']])->save();
            }
        }
    }
}
