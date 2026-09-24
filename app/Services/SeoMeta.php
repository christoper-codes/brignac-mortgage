<?php

namespace App\Services;

use Illuminate\Http\Request;

/**
 * Search-engine and social-sharing metadata for the current page, rendered server-side into the
 * document head (crawlers and link-preview bots don't run the React app). Only pages listed in
 * config/site.php are indexed; everything else is marked noindex.
 */
class SeoMeta
{
    /**
     * @return array{title: ?string, description: ?string, canonical: string, robots: string, image: string, site_name: string, schema: ?array<string, mixed>}
     */
    public function forRequest(Request $request): array
    {
        $business = config('site.business');
        $page = config('site.pages.'.$request->route()?->getName());

        return [
            'title' => $page['title'] ?? null,
            'description' => $page['description'] ?? null,
            // The query string is dropped on purpose: ad links carry UTM tags, and every variant of a
            // page should count as the one canonical URL.
            'canonical' => url($request->path() === '/' ? '/' : $request->path()),
            'robots' => $page === null ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
            'image' => url(config('site.og_image')),
            'site_name' => $business['name'],
            'schema' => ($page['schema'] ?? false) ? $this->businessSchema() : null,
        ];
    }

    /**
     * schema.org FinancialService (a LocalBusiness) plus the WebSite it publishes.
     *
     * @return array<string, mixed>
     */
    public function businessSchema(): array
    {
        $business = config('site.business');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'FinancialService',
                    '@id' => url('/').'#business',
                    'name' => $business['name'],
                    'legalName' => $business['legal_name'],
                    'description' => config('site.pages.home.description'),
                    'url' => url('/'),
                    'logo' => url('/img/darklogo.png'),
                    'image' => url(config('site.og_image')),
                    'telephone' => $business['phone'],
                    'email' => $business['email'],
                    'identifier' => "NMLS #{$business['nmls']}",
                    'areaServed' => ['@type' => 'State', 'name' => 'Louisiana'],
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressRegion' => $business['region'],
                        'addressCountry' => $business['country'],
                    ],
                    'geo' => [
                        '@type' => 'GeoCoordinates',
                        'latitude' => $business['geo']['latitude'],
                        'longitude' => $business['geo']['longitude'],
                    ],
                    'openingHoursSpecification' => [[
                        '@type' => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        'opens' => $business['opens'],
                        'closes' => $business['closes'],
                    ]],
                    'sameAs' => $business['same_as'],
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => url('/').'#website',
                    'url' => url('/'),
                    'name' => $business['name'],
                    'publisher' => ['@id' => url('/').'#business'],
                ],
            ],
        ];
    }
}
