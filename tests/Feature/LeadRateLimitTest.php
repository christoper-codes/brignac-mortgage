<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

test('lead submissions are rate-limited to protect against spam', function () {
    Mail::fake();
    Http::fake();

    for ($i = 0; $i < 5; $i++) {
        $this->post(route('leads.store'), leadPayload())->assertSessionHasNoErrors();
    }

    $this->post(route('leads.store'), leadPayload())->assertStatus(429);
});
