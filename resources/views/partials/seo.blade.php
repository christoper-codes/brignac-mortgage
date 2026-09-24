{{-- Server-rendered SEO / social tags. Deliberately NOT marked `inertia`, so Inertia's head manager leaves them alone. --}}
<meta name="robots" content="{{ $seo['robots'] }}">
<link rel="canonical" href="{{ $seo['canonical'] }}">
@if ($seo['description'])
    <meta name="description" content="{{ $seo['description'] }}">
@endif
<meta name="theme-color" content="#51b003">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{{ $seo['site_name'] }}">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="{{ $seo['canonical'] }}">
@if ($seo['title'])
    <meta property="og:title" content="{{ $seo['title'] }} - {{ $seo['site_name'] }}">
@endif
@if ($seo['description'])
    <meta property="og:description" content="{{ $seo['description'] }}">
@endif
<meta property="og:image" content="{{ $seo['image'] }}">

<meta name="twitter:card" content="summary_large_image">
@if ($seo['title'])
    <meta name="twitter:title" content="{{ $seo['title'] }} - {{ $seo['site_name'] }}">
@endif
@if ($seo['description'])
    <meta name="twitter:description" content="{{ $seo['description'] }}">
@endif
<meta name="twitter:image" content="{{ $seo['image'] }}">

@if ($seo['schema'])
    <script type="application/ld+json">{!! json_encode($seo['schema'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
@endif
