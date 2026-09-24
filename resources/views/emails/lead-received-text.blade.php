Thanks, {{ $firstName }}. We've got it.

A member of our Louisiana loan team will reach out to you shortly. Here's a copy of what you sent us:

Name: {{ $lead->full_name }}
Email: {{ $lead->email }}
Phone: {{ $lead->phone }}
@if ($lead->message)
Message: {{ $lead->message }}
@endif

What happens next:
1. We review your request.
2. A loan officer reaches out by phone or email.
3. You get pre-qualified and matched with the right program.

Need it sooner? Call or text {{ $business['phone_display'] }}, Monday to Friday, 9 am - 5 pm Central. You can also just reply to this email.

{{ $business['legal_name'] }} - NMLS #{{ $business['nmls'] }}
Equal Housing Opportunity Lender
