<?php

use App\Mail\LeadReceivedMail;
use App\Mail\NewLeadMail;
use App\Models\Campaign;
use App\Models\Lead;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Http::preventStrayRequests();
    config(['site.lead_notification_emails' => ['christoper.patiho@gmail.com']]);
});

function submitLead(array $overrides = []): void
{
    test()->post(route('leads.store'), [
        'full_name' => 'Maria Lopez',
        'email' => 'maria@example.com',
        'phone' => '(504) 555-0123',
        'message' => "I'd like to refinance.\nMy rate is 7.5%.",
        'sms_consent' => true,
        'visitor_id' => 'visitor-1',
        ...$overrides,
    ]);
}

test('the lead gets a confirmation email with a copy of what they sent', function () {
    Mail::fake();

    submitLead();

    Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail) {
        return $mail->hasTo('maria@example.com')
            && $mail->hasSubject('We got your request, Maria')
            && $mail->hasReplyTo(config('site.business.email'))
            && $mail->assertSeeInHtml('Thanks, Maria.')
            && $mail->assertSeeInHtml('My rate is 7.5%.')
            && $mail->assertSeeInText('Phone: (504) 555-0123');
    });
});

test('the filled-in form is emailed to the team and replying answers the lead', function () {
    Mail::fake();
    $campaign = Campaign::factory()->create(['code' => 'spring-fha', 'name' => 'Spring FHA']);

    submitLead(['utm_source' => 'facebook', 'utm_campaign' => 'spring-fha', 'landing_path' => '/programs']);

    Mail::assertSent(NewLeadMail::class, function (NewLeadMail $mail) use ($campaign) {
        return $mail->hasTo('christoper.patiho@gmail.com')
            && $mail->hasReplyTo('maria@example.com')
            && $mail->hasSubject("New lead: Maria Lopez · {$campaign->name}")
            && $mail->assertSeeInHtml('Maria Lopez')
            && $mail->assertSeeInHtml('maria@example.com')
            && $mail->assertSeeInHtml('Spring FHA')
            && $mail->assertSeeInHtml('/programs')
            && $mail->assertSeeInHtml(route('dashboard.leads.index', ['q' => 'maria@example.com']));
    });
});

test('every configured recipient gets the team email', function () {
    Mail::fake();
    config(['site.lead_notification_emails' => ['christoper.patiho@gmail.com', 'second@example.com']]);

    submitLead();

    Mail::assertSent(NewLeadMail::class, fn (NewLeadMail $mail) => $mail->hasTo('christoper.patiho@gmail.com') && $mail->hasTo('second@example.com'));
});

test('no team email is sent when there are no recipients', function () {
    Mail::fake();
    config(['site.lead_notification_emails' => []]);

    submitLead();

    Mail::assertSent(LeadReceivedMail::class);
    Mail::assertNotSent(NewLeadMail::class);
});

test('message text is escaped in the emails', function () {
    Mail::fake();

    submitLead(['message' => '<script>alert(1)</script>']);

    Mail::assertSent(NewLeadMail::class, fn (NewLeadMail $mail) => $mail->assertDontSeeInHtml('<script>alert(1)</script>', escape: false) && $mail->assertSeeInHtml('&lt;script&gt;', escape: false));
});

test('a mail failure never breaks the lead submission', function () {
    Mail::shouldReceive('to')->andThrow(new RuntimeException('SMTP is down'));

    submitLead();

    expect(Lead::query()->count())->toBe(1);
});

test('the default team recipient is the project owner', function () {
    expect(config('site.lead_notification_emails'))->toContain('christoper.patiho@gmail.com');
});
