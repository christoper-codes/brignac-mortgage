<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Business
    |--------------------------------------------------------------------------
    |
    | Facts about the company that appear in search-engine structured data and
    | in the emails sent to leads and to the team.
    |
    */

    'business' => [
        'name' => 'Brignac Mortgage',
        'legal_name' => 'Brignac Mortgage and Consulting Services LLC',
        'nmls' => '2401214',
        'phone' => '+1-504-559-2821',
        'phone_display' => '(504) 559-2821',
        'email' => 'Shaun@brignacmortgage.com',
        'region' => 'LA',
        'country' => 'US',
        // Approximate office location (from the Google Maps embed on /apply). Add the street address here
        // once confirmed — search engines use it for local results.
        'geo' => ['latitude' => 30.227, 'longitude' => -90.7284],
        'same_as' => [
            'https://www.facebook.com/BrignacMortgage',
            'https://www.instagram.com/shaunbrignac',
            'https://www.tiktok.com/@shaunbrignac',
            'https://x.com/shaunbrignac',
            'https://maps.app.goo.gl/kSBdEXrM5XXNnSBE7',
        ],
        // Monday–Friday, 9am–5pm (Saturday and Sunday by appointment).
        'opens' => '09:00',
        'closes' => '17:00',
    ],

    /*
    |--------------------------------------------------------------------------
    | Lead notification recipients
    |--------------------------------------------------------------------------
    |
    | Every submitted lead form is emailed to these addresses. Comma-separated
    | in .env: LEAD_NOTIFICATION_EMAILS=one@example.com,two@example.com
    |
    */

    'lead_notification_emails' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('LEAD_NOTIFICATION_EMAILS', 'christoper.patiho@gmail.com')),
    ))),

    /*
    |--------------------------------------------------------------------------
    | Public pages (SEO)
    |--------------------------------------------------------------------------
    |
    | Keyed by route name. Only routes listed here are indexed and appear in
    | the sitemap; every other page (dashboard, login, settings...) is sent
    | with noindex. Keep each title in sync with the page's <Head title>.
    | `schema` adds the business's structured data to that page.
    |
    */

    'pages' => [
        'home' => [
            'title' => 'Louisiana Mortgage Lender & Loan Officers',
            'description' => 'Brignac Mortgage is a Louisiana wholesale mortgage broker. Compare FHA, VA, USDA, conventional and jumbo loans, run the numbers, and get pre-qualified fast.',
            'schema' => true,
        ],
        'programs' => [
            'title' => 'FHA, VA, USDA & Jumbo Loans in Louisiana',
            'description' => 'Explore FHA, conventional, VA, USDA, ARM and jumbo loan programs — credit score ranges, down payment tiers and eligible properties for Louisiana homebuyers.',
        ],
        'apply' => [
            'title' => 'Apply for a Mortgage in Louisiana',
            'description' => 'Meet the licensed loan officers at Brignac Mortgage and start your application with the person who will guide you from first question to closing day.',
            'schema' => true,
        ],
        'testimonials' => [
            'title' => 'Client Reviews & Testimonials',
            'description' => 'Read real reviews from Louisiana homeowners who financed their homes with Brignac Mortgage.',
        ],
        'disclaimers' => [
            'title' => 'Disclaimers',
            'description' => 'Important disclosures and disclaimers for Brignac Mortgage and Consulting Services LLC, NMLS #2401214.',
        ],
        'privacy-policy' => [
            'title' => 'Privacy Policy',
            'description' => 'How Brignac Mortgage collects, uses and protects your personal information.',
        ],
        'terms-and-conditions' => [
            'title' => 'Terms and Conditions',
            'description' => 'The terms and conditions for using the Brignac Mortgage website and services.',
        ],
    ],

    // Social-sharing image (absolute URL is built from this path).
    'og_image' => '/img/hero.png',

];
