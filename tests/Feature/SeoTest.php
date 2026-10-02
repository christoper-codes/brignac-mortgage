<?php

use App\Models\User;

test('public pages carry a description, canonical url and social tags', function (string $route, string $title) {
    $this->get(route($route))
        ->assertOk()
        ->assertSee('<meta name="robots" content="index, follow, max-image-preview:large">', false)
        ->assertSee('<link rel="canonical" href="'.url($route === 'home' ? '/' : parse_url(route($route), PHP_URL_PATH)).'">', false)
        ->assertSee('<meta name="description" content="', false)
        ->assertSee('<meta property="og:title" content="'.e($title).' - Brignac Mortgage">', false)
        ->assertSee('<meta property="og:image" content="'.url('/img/hero.png').'">', false)
        ->assertSee('<meta name="twitter:card" content="summary_large_image">', false);
})->with([
    ['home', 'Louisiana Mortgage Lender & Loan Officers'],
    ['programs', 'FHA, VA, USDA & Jumbo Loans in Louisiana'],
    ['apply', 'Apply for a Mortgage in Louisiana'],
    ['testimonials', 'Client Reviews & Testimonials'],
]);

test('ad links canonicalize to the clean url, without utm tags', function () {
    $this->get('/?utm_source=facebook&utm_medium=paid_social&utm_campaign=spring-fha')
        ->assertSee('<link rel="canonical" href="'.url('/').'">', false);
});

test('the home page publishes the business as structured data', function () {
    $html = $this->get(route('home'))->getContent();

    preg_match('#<script type="application/ld\+json">(.*?)</script>#s', $html, $match);
    $schema = json_decode($match[1] ?? '', true);

    expect($schema['@graph'][0])
        ->toMatchArray(['@type' => 'FinancialService', 'telephone' => '+1-504-559-2821', 'identifier' => 'NMLS #2401214'])
        ->and($schema['@graph'][0]['address'])
        ->toMatchArray(['streetAddress' => '21121 Waterfront East Dr', 'addressLocality' => 'Maurepas', 'postalCode' => '70449', 'addressRegion' => 'LA'])
        ->and($schema['@graph'][0]['aggregateRating'])
        ->toMatchArray(['@type' => 'AggregateRating', 'ratingValue' => 5.0, 'reviewCount' => 15])
        ->and($schema['@graph'][1]['@type'])->toBe('WebSite')
        ->and($schema['@graph'][2])
        ->toMatchArray(['@type' => 'FAQPage'])
        ->and($schema['@graph'][2]['mainEntity'][0])
        ->toMatchArray(['@type' => 'Question', 'name' => 'How do I get pre-qualified for a mortgage?']);
});

test('only the home page carries FAQPage structured data', function () {
    $html = $this->get(route('apply'))->getContent();

    preg_match('#<script type="application/ld\+json">(.*?)</script>#s', $html, $match);
    $schema = json_decode($match[1] ?? '', true);

    expect(collect($schema['@graph'])->pluck('@type')->all())->not->toContain('FAQPage');
});

test('pages that are not public are marked noindex', function () {
    $this->get(route('login'))->assertSee('<meta name="robots" content="noindex, nofollow">', false);

    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertSee('<meta name="robots" content="noindex, nofollow">', false)
        ->assertDontSee('application/ld+json', false);
});

test('the sitemap lists every public page and nothing private', function () {
    $response = $this->get(route('sitemap'))->assertOk();

    expect($response->headers->get('Content-Type'))->toContain('application/xml');

    foreach (['home', 'programs', 'apply', 'testimonials', 'disclaimers', 'privacy-policy', 'terms-and-conditions'] as $name) {
        $response->assertSee('<loc>'.route($name).'</loc>', false);
    }

    $response->assertDontSee('dashboard', false)->assertDontSee('login', false);
});

test('robots.txt blocks private areas and points to the sitemap and llms.txt', function () {
    $this->get(route('robots'))
        ->assertOk()
        ->assertSee('Disallow: /dashboard')
        ->assertSee('Disallow: /track/')
        ->assertSee('Sitemap: '.url('sitemap.xml'))
        ->assertSee(url('llms.txt'));
});

test('llms.txt summarizes the business for AI assistants', function () {
    $this->get(route('llms'))
        ->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
        ->assertSee('Brignac Mortgage')
        ->assertSee('NMLS #2401214')
        ->assertSee(url('/programs'))
        ->assertSee(url('/apply'))
        ->assertSee('Shaun Brignac, MBA');
});
