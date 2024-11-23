@component('mail::message')
<style>
    body {
        font-family: Arial, sans-serif;
        color: #718096;
    }
    .content {
        color: #718096;
    }
    .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
        color: #718096;
    }
    .content p, .content ul, .content ol {
        color: #718096;
    }

</style>

<h1 style="font-size: 30px !important;"><span style="font-style: italic !important; color: #2563eb !important;">New</span> {{ $details['is_hiring'] ? 'Hiring Candidate' : 'Interested Client'}} </h1>

<x-mail::panel>
    Hello administration👋,
    You have received a new inquiry from a client interested in our programs. Here are the details:
</x-mail::panel>

<h2>• Email Address:</h2>
<p>{{ $details['email'] }}</p>
<h2>• Subject:</h2>
<p>{{ $details['title'] }}</p>
<h2>• Description:</h2>
<p>{{ $details['body'] }}</p>

@component('mail::button', ['url' => 'mailto:' . $details['email']])
Respond to the Client 🚀
@endcomponent

Thank you for your attention,

{{ config('app.name') }}
@endcomponent