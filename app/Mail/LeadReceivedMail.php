<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Support\Str;

/**
 * The confirmation the person who filled in the contact form receives.
 */
class LeadReceivedMail extends Mailable
{
    public function __construct(public Lead $lead) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "We got your request, {$this->firstName()}",
            replyTo: [new Address(config('site.business.email'), config('site.business.name'))],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.lead-received',
            text: 'emails.lead-received-text',
            with: ['firstName' => $this->firstName(), 'business' => config('site.business')],
        );
    }

    private function firstName(): string
    {
        return Str::of($this->lead->full_name)->trim()->before(' ')->toString();
    }
}
