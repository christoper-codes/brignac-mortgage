<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'light') == 'dark'])>
    <head>
        @php($seo = app(\App\Services\SeoMeta::class)->forRequest(request()))
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to apply the saved appearance immediately. localStorage is the source of truth;
             with nothing saved the site starts in light mode (it does not follow the system setting). --}}
        <script>
            (function() {
                let appearance = 'light';

                try {
                    appearance = localStorage.getItem('appearance') || 'light';
                } catch (error) {}

                const isDark = appearance === 'dark'
                    || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                document.documentElement.classList.toggle('dark', isDark);
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: #101215;
            }
        </style>

        @include('partials.seo', ['seo' => $seo])

        <link rel="icon" href="/img/logo.ico" sizes="any">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        {{--
            Site-wide ad / analytics IDs, read by the tracker (which lives outside the Inertia
            page tree). Google Analytics is blanked out outside production — otherwise every local
            run (ours or a visitor's dev build) would report a real page view to Shaun's real GA4
            property. This only withholds the ID from the PUBLIC script tag; the dashboard's own
            settings form still reads the real saved value straight from TrackingSetting::shared(),
            so editing it works the same in every environment. Our own visit/click tracking
            (lib/tracking.ts, feeding /dashboard/analytics) is untouched by this and always runs.
        --}}
        @php($tracking = array_merge(
            \App\Models\TrackingSetting::shared(),
            app()->environment('production') ? [] : ['googleAnalyticsId' => null],
        ))
        <script>window.__tracking = @json($tracking);</script>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $seo['title'] ? $seo['title'].' - '.$seo['site_name'] : config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
