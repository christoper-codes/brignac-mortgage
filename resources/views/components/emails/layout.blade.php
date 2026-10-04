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
    {{-- Forced light, same as the rest of the site's public-facing pages: these two tags tell
    clients that honor them (iOS/macOS Mail, newer Outlook) not to auto-darken the email, and
    there's no @media (prefers-color-scheme: dark) block here to override the inline colors below
    even if a client ignores the tags. Gmail's own algorithmic dark mode can't be told "no" outright,
    but it leaves explicit inline background/text colors alone as long as every element sets them,
    which they already do throughout these templates. --}}
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>{{ $business['name'] }}</title>
    <style>
        body { margin: 0; padding: 0; background: #f5f5f7; }
        a { color: #3f8f02; }
        @media (max-width: 600px) {
            .container { width: 100% !important; }
            .pad { padding-left: 24px !important; padding-right: 24px !important; }
            .h1 { font-size: 27px !important; }
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
                            <img src="{{ url('/img/darklogo.png') }}" alt="{{ $business['name'] }}" width="128" style="display:block;border:0;height:auto;">
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
