New lead: {{ $lead->full_name }}
Submitted {{ $submittedAt }}

Phone: {{ $lead->phone }}
Email: {{ $lead->email }}
@if ($lead->message)

Message:
{{ $lead->message }}
@endif

Campaign: {{ $lead->campaign?->name ?? '-' }}
Source: {{ collect([$lead->utm_source, $lead->utm_medium])->filter()->implode(' / ') ?: '-' }}
Landing page: {{ $lead->landing_path ?? '-' }}
Location: {{ $location ?: '-' }}
Device: {{ collect([$lead->device_type, $lead->browser, $lead->os])->filter()->implode(' · ') ?: '-' }}

Open in dashboard: {{ $dashboardUrl }}
(Reply to this email to answer the lead directly.)
