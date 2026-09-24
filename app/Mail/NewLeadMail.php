<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * The filled-in contact form, sent to the team. Replying answers the lead directly.
 */
class NewLeadMail extends Mailable
{
    public function __construct(public Lead $lead) {}

    public function envelope(): Envelope
    {
        $campaign = $this->lead->campaign?->name;

        return new Envelope(
            subject: "New lead: {$this->lead->full_name}".($campaign ? " · {$campaign}" : ''),
            replyTo: [new Address($this->lead->email, $this->lead->full_name)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-lead',
            text: 'emails.new-lead-text',
            with: [
                'business' => config('site.business'),
                'dashboardUrl' => route('dashboard.leads.index', ['q' => $this->lead->email]),
                'location' => collect([$this->lead->city, $this->lead->region ?: $this->lead->region_code])->filter()->implode(', '),
                'submittedAt' => $this->lead->created_at?->timezone('America/Chicago')->format('M j, Y · g:i A').' CT',
            ],
        );
    }
}
