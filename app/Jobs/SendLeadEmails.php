<?php

namespace App\Jobs;

use App\Mail\LeadReceivedMail;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;
use Throwable;

/**
 * Emails a "we got your request" confirmation to the lead and the filled-in form to the team.
 * Dispatched after the response is sent (like the geolocation and Meta jobs), so a slow or failing
 * mail server never delays or breaks the visitor's submission. Each email is attempted on its own.
 */
class SendLeadEmails
{
    use Dispatchable;

    public function __construct(public Lead $lead) {}

    public function handle(): void
    {
        // Geolocation is filled in by an earlier after-response job, so reload to pick it up.
        $lead = $this->lead->fresh(['campaign']) ?? $this->lead;

        $this->attempt(fn () => Mail::to($lead->email, $lead->full_name)->send(new LeadReceivedMail($lead)));

        $recipients = config('site.lead_notification_emails');

        if ($recipients !== []) {
            $this->attempt(fn () => Mail::to($recipients)->send(new NewLeadMail($lead)));
        }
    }

    private function attempt(callable $send): void
    {
        try {
            $send();
        } catch (Throwable $exception) {
            report($exception);
        }
    }
}
