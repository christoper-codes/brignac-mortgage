<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {{-- Seo --}}
        <meta name="description" content="Welcome to Brignac Mortgage - Louisiana's trusted wholesale mortgage broker. Get the best mortgage rates and exceptional service from our team of professionals. Led by President & CEO Shaun Brignac.">
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brignac Mortgage - Louisiana Wholesale Mortgage Broker | Best Rates & Service" />
        <meta property="og:description" content="Welcome to Brignac Mortgage - Louisiana's trusted wholesale mortgage broker. Get the best mortgage rates and exceptional service from our team of professionals. Led by President & CEO Shaun Brignac." />
        <meta property="og:url" content="https://brignacmortgage.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="/img/lionlogo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brignac Mortgage - Louisiana Wholesale Mortgage Broker | Best Rates & Service" />
        <meta name="twitter:description" content="Welcome to Brignac Mortgage - Louisiana's trusted wholesale mortgage broker. Get the best mortgage rates and exceptional service from our team of professionals." />
        <title inertia>{{ config('app.name', 'Brignac Mortgage') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="icon" href="/img/lionlogo.webp">

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased text-gray-600">
        @inertia
        <script src="https://widget.tagembed.com/embed.min.js" type="text/javascript"></script>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v21.0"></script>
    </body>
</html>
