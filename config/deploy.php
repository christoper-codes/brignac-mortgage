<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Deploy token
    |--------------------------------------------------------------------------
    |
    | Protects the one-time setup routes in routes/web.php (migrate, seed, ...) on hosts without
    | SSH/terminal access. Set DEPLOY_TOKEN in the production .env to a long random value — e.g.
    | `php artisan tinker --execute 'echo Str::random(40);'` — and remove that whole route block
    | (and this file) once the site is live and you've run them. A long-lived "wipe the database
    | from a URL" endpoint is a real risk even behind a token: tokens end up in browser history,
    | server logs, and screenshots.
    |
    */
    'token' => env('DEPLOY_TOKEN'),
];
