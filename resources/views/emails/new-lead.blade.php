@php
    $font = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
    $details = array_filter([
        'Campaign' => $lead->campaign?->name,
        'Source' => collect([$lead->utm_source, $lead->utm_medium])->filter()->implode(' / '),
        'UTM campaign' => $lead->utm_campaign,
        'Landing page' => $lead->landing_path,
        'Referrer' => $lead->referrer,
        'Location' => $location,
        'Device' => collect([$lead->device_type, $lead->browser, $lead->os])->filter()->implode(' · '),
        'IP address' => $lead->ip_address,
    ]);
@endphp
<x-emails.layout :preheader="$lead->full_name.' just sent the contact form.'">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="pad" style="padding:44px 44px 8px;font-family:{!! $font !!};">
                <span class="badge" style="display:inline-block;background:#eaf6dc;color:#3f8f02;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:6px 14px;border-radius:999px;">New lead</span>
                <h1 class="text h1" style="margin:20px 0 0;font-size:32px;line-height:1.12;letter-spacing:-0.02em;font-weight:700;color:#14170f;">{{ $lead->full_name }}</h1>
                <p class="muted" style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#86868b;">Submitted {{ $submittedAt }}@if ($lead->sms_consent_at) &nbsp;·&nbsp; agreed to SMS @endif</p>
            </td>
        </tr>

        <tr>
            <td class="pad" style="padding:22px 44px 4px;font-family:{!! $font !!};">
                <a class="btn-dark" href="tel:{{ preg_replace('/[^0-9+]/', '', $lead->phone) }}" style="display:inline-block;background:#14170f;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:13px 22px;border-radius:999px;">Call {{ $lead->phone }}</a>
                <a href="mailto:{{ $lead->email }}" style="display:inline-block;color:#3f8f02;text-decoration:none;font-size:15px;font-weight:600;padding:13px 12px;">{{ $lead->email }}</a>
            </td>
        </tr>

        @if ($lead->message)
            <tr>
                <td class="pad" style="padding:22px 44px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="panel" style="background:#f5f5f7;border-radius:20px;">
                        <tr>
                            <td style="padding:20px 22px;font-family:{!! $font !!};">
                                <div class="muted" style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#86868b;">Message</div>
                                <div class="text" style="margin-top:6px;font-size:16px;line-height:1.55;color:#14170f;">{!! nl2br(e($lead->message)) !!}</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        @endif

        @if ($details !== [])
            <tr>
                <td class="pad" style="padding:26px 44px 0;font-family:{!! $font !!};">
                    <div class="text" style="font-size:18px;font-weight:700;letter-spacing:-0.01em;color:#14170f;">Where they came from</div>
                </td>
            </tr>
            <tr>
                <td class="pad" style="padding:8px 44px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        @foreach ($details as $label => $value)
                            <tr>
                                <td class="rule" width="120" valign="top" style="padding:12px 0;border-bottom:1px solid #e8e8ed;font-family:{!! $font !!};font-size:13px;color:#86868b;">{{ $label }}</td>
                                <td class="rule text" valign="top" style="padding:12px 0;border-bottom:1px solid #e8e8ed;font-family:{!! $font !!};font-size:14px;line-height:1.45;color:#14170f;word-break:break-word;">{{ $value }}</td>
                            </tr>
                        @endforeach
                    </table>
                </td>
            </tr>
        @endif

        <tr>
            <td class="pad" style="padding:32px 44px 44px;font-family:{!! $font !!};">
                <a class="btn-dark" href="{{ $dashboardUrl }}" style="display:inline-block;background:#14170f;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 26px;border-radius:999px;">Open in dashboard</a>
                <span class="muted" style="display:inline-block;padding:14px 12px;font-size:13px;color:#86868b;">or just reply to answer {{ \Illuminate\Support\Str::of($lead->full_name)->before(' ') }}.</span>
            </td>
        </tr>
    </table>
</x-emails.layout>
