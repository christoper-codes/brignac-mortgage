<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Stamps the signed-in user's "last seen" (at most once every few minutes, so it costs one small
 * write per visit, not per request) for the owner's Users page.
 *
 * It also covers people whose session started before sign-ins were recorded: with no sign-in on file,
 * the first request we see is stored as their sign-in, so they don't show up as "never signed in"
 * while they are plainly using the dashboard.
 */
class RecordUserActivity
{
    private const REFRESH_MINUTES = 5;

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ($user->last_seen_at === null || $user->last_seen_at->diffInMinutes(now(), true) >= self::REFRESH_MINUTES)) {
            $attributes = ['last_seen_at' => now()];

            if ($user->last_login_at === null) {
                $attributes += ['last_login_at' => now(), 'login_count' => max(1, $user->login_count), 'last_login_ip' => $request->ip()];
            }

            $user->forceFill($attributes)->saveQuietly();
        }

        return $next($request);
    }
}
