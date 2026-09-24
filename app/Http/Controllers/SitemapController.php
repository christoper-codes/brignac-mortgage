<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = collect(array_keys(config('site.pages')))
            ->map(fn (string $name): array => [
                'loc' => route($name),
                'priority' => $name === 'home' ? '1.0' : (in_array($name, ['programs', 'apply'], true) ? '0.8' : '0.5'),
            ]);

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml');
    }
}
