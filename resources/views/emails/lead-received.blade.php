@php
    $font = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
    $rows = array_filter([
        'Name' => $lead->full_name,
        'Email' => $lead->email,
        'Phone' => $lead->phone,
        'Message' => $lead->message,
    ]);
    $steps = [
        ['We review your request', 'Your details go straight to our Louisiana loan team.'],
        ['A loan officer reaches out', 'By phone or email, to understand your goals.'],
        ['You get pre-qualified', 'And we match you with the program that fits you best.'],
    ];
@endphp
<x-emails.layout preheader="A member of our Louisiana loan team will reach out shortly.">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="pad" style="padding:44px 44px 8px;font-family:{!! $font !!};">
                <span class="badge" style="display:inline-block;background:#eaf6dc;color:#3f8f02;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:6px 14px;border-radius:999px;">Request received</span>
                <h1 class="text h1" style="margin:20px 0 0;font-size:32px;line-height:1.12;letter-spacing:-0.02em;font-weight:700;color:#14170f;">Thanks, {{ $firstName }}.<br>We&rsquo;ve got it.</h1>
                <p class="muted" style="margin:16px 0 0;font-size:16px;line-height:1.55;color:#515154;">A member of our Louisiana loan team will reach out to you shortly. Here&rsquo;s a copy of what you sent us.</p>
            </td>
        </tr>

        <tr>
            <td class="pad" style="padding:24px 44px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="panel" style="background:#f5f5f7;border-radius:20px;">
                    @foreach ($rows as $label => $value)
                        <tr>
                            <td style="padding:{{ $loop->first ? '20px' : '4px' }} 22px {{ $loop->last ? '20px' : '10px' }};font-family:{!! $font !!};">
                                <div class="muted" style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#86868b;">{{ $label }}</div>
                                <div class="text" style="margin-top:4px;font-size:15px;line-height:1.5;color:#14170f;">{!! nl2br(e($value)) !!}</div>
                            </td>
                        </tr>
                    @endforeach
                </table>
            </td>
        </tr>

        <tr>
            <td class="pad" style="padding:28px 44px 4px;font-family:{!! $font !!};">
                <div class="text" style="font-size:18px;font-weight:700;letter-spacing:-0.01em;color:#14170f;">What happens next</div>
            </td>
        </tr>
        @foreach ($steps as $index => $step)
            <tr>
                <td class="pad" style="padding:12px 44px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td width="36" valign="top" style="padding-top:2px;">
                                <div style="width:26px;height:26px;border-radius:13px;background:#14170f;color:#ffffff;font-family:{!! $font !!};font-size:13px;font-weight:600;line-height:26px;text-align:center;">{{ $index + 1 }}</div>
                            </td>
                            <td valign="top" style="font-family:{!! $font !!};">
                                <div class="text" style="font-size:15px;font-weight:600;color:#14170f;">{{ $step[0] }}</div>
                                <div class="muted" style="margin-top:2px;font-size:14px;line-height:1.5;color:#6e6e73;">{{ $step[1] }}</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        @endforeach

        <tr>
            <td class="pad" style="padding:34px 44px 8px;font-family:{!! $font !!};">
                <a class="btn-dark" href="tel:{{ $business['phone'] }}" style="display:inline-block;background:#14170f;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 26px;border-radius:999px;">Call {{ $business['phone_display'] }}</a>
                <a href="{{ url('/apply') }}" style="display:inline-block;color:#3f8f02;text-decoration:none;font-size:15px;font-weight:600;padding:14px 14px;">Meet the team &rarr;</a>
            </td>
        </tr>

        <tr>
            <td class="pad" style="padding:20px 44px 44px;font-family:{!! $font !!};">
                <div class="rule" style="border-top:1px solid #e8e8ed;padding-top:18px;font-size:13px;line-height:1.6;color:#86868b;" >
                    <span class="muted">Need it sooner? Call or text {{ $business['phone_display'] }}, Monday to Friday, 9 am &ndash; 5 pm Central. You can simply reply to this email, too.</span>
                </div>
            </td>
        </tr>
    </table>
</x-emails.layout>
