@props(['preheader' => ''])
@php
    $business = config('site.business');
    $font = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>{{ $business['name'] }}</title>
    <style>
        body { margin: 0; padding: 0; background: #f5f5f7; }
        a { color: #3f8f02; }
        .logo-dark { display: none; }
        @media (max-width: 600px) {
            .container { width: 100% !important; }
            .pad { padding-left: 24px !important; padding-right: 24px !important; }
            .h1 { font-size: 27px !important; }
        }
        @media (prefers-color-scheme: dark) {
            body, .page { background: #000000 !important; }
            .card { background: #1c1c1e !important; }
            .text { color: #f5f5f7 !important; }
            .muted { color: #a1a1a6 !important; }
            .panel { background: #2c2c2e !important; }
            .rule { border-color: #3a3a3c !important; }
            .btn-dark { background: #f5f5f7 !important; color: #000000 !important; }
            .badge { background: #1f3a0d !important; color: #8fd955 !important; }
            .logo-light { display: none !important; }
            .logo-dark { display: block !important; }
        }
    </style>
</head>
<body class="page" style="margin:0;padding:0;background:#f5f5f7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{{ $preheader }}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="page" style="background:#f5f5f7;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table role="presentation" class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;">
                    <tr>
                        <td style="padding:0 12px 22px;">
                            <img class="logo-light" src="{{ url('/img/darklogo.png') }}" alt="{{ $business['name'] }}" width="128" style="display:block;border:0;height:auto;">
                            <img class="logo-dark" src="{{ url('/img/lightlogo.png') }}" alt="{{ $business['name'] }}" width="128" style="display:none;border:0;height:auto;">
                        </td>
                    </tr>

                    <tr>
                        <td class="card" style="background:#ffffff;border-radius:28px;">
                            {{ $slot }}
                        </td>
                    </tr>

                    <tr>
                        <td class="muted" style="padding:26px 12px 0;font-family:{!! $font !!};font-size:12px;line-height:1.6;color:#86868b;text-align:center;">
                            {{ $business['legal_name'] }} · NMLS #{{ $business['nmls'] }}<br>
                            {{ $business['address']['street'] }}, {{ $business['address']['city'] }}, {{ $business['region'] }} {{ $business['address']['postal_code'] }}<br>
                            Equal Housing Opportunity Lender<br>
                            <a href="{{ url('/privacy-policy') }}" style="color:#86868b;">Privacy Policy</a> &nbsp;·&nbsp;
                            <a href="{{ url('/terms-and-conditions') }}" style="color:#86868b;">Terms</a> &nbsp;·&nbsp;
                            <a href="{{ url('/') }}" style="color:#86868b;">{{ parse_url(url('/'), PHP_URL_HOST) }}</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
