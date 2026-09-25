<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;

/**
 * Keeps the "who has signed in, and when" record the owner sees on the Users page.
 */
class RecordUserLogin
{
    /**
     * Sign-ins that land within this many seconds of the last recorded one are the same visit (a
     * remember-me session being revived, or two auth events firing for one login), not a new one.
     */
    private const DEDUPE_SECONDS = 60;

    public function handle(Login $event): void
    {
        $user = $event->user;

        if (! $user instanceof User) {
            return;
        }

        if ($user->last_login_at !== null && $user->last_login_at->diffInSeconds(now(), true) < self::DEDUPE_SECONDS) {
            return;
        }

        $user->forceFill([
            'last_login_at' => now(),
            'last_seen_at' => now(),
            'login_count' => $user->login_count + 1,
            'last_login_ip' => request()->ip(),
        ])->saveQuietly();
    }
}
