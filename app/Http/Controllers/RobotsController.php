<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    /**
     * Crawlers may read the public site; the team dashboard, auth, settings and the tracking / lead
     * endpoints are off limits. The sitemap URL is absolute, so this is generated rather than static.
     */
    public function __invoke(): Response
    {
        $lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /dashboard',
            'Disallow: /settings',
            'Disallow: /login',
            'Disallow: /register',
            'Disallow: /auth/',
            'Disallow: /user',
            'Disallow: /two-factor',
            'Disallow: /track/',
            'Disallow: /leads',
            '',
            'Sitemap: '.url('sitemap.xml'),
        ];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
