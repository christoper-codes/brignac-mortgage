<?php

use App\Models\Campaign;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config([
        'services.openai.key' => 'test-key',
        'services.openai.url' => 'https://api.openai.test/v1',
        'services.openai.model' => 'gpt-4.1-mini',
    ]);
});

function fakeOpenAi(string ...$contents): void
{
    Http::preventStrayRequests();
    Http::fake(['api.openai.test/*' => Http::sequence(array_map(
        fn (string $content) => Http::response(['choices' => [['message' => ['content' => $content]]]]),
        $contents,
    ))]);
}

test('guests cannot reach the AI page or its endpoints', function () {
    $this->get(route('dashboard.ai'))->assertRedirect(route('login'));
    $this->postJson(route('dashboard.ai.plan'), ['message' => 'hi'])->assertUnauthorized();
    $this->postJson(route('dashboard.ai.answer'), ['message' => 'hi', 'sources' => [], 'days' => 30])->assertUnauthorized();
});

test('the AI page renders and reports whether the API key is configured', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard.ai'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('dashboard/ai')->where('configured', true));

    config(['services.openai.key' => null]);

    $this->get(route('dashboard.ai'))
        ->assertInertia(fn (Assert $page) => $page->where('configured', false));
});

test('planning only sends the menu of data options, never the data itself', function () {
    Campaign::factory()->create(['name' => 'Secret Campaign Name']);
    fakeOpenAi('{"sources":["campaigns","top_pages"],"days":7}');

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.plan'), ['message' => 'Which campaign is best this week?'])
        ->assertOk()
        ->assertJson([
            'sources' => [['id' => 'campaigns', 'label' => 'Campaigns'], ['id' => 'top_pages', 'label' => 'Top pages']],
            'days' => 7,
        ]);

    Http::assertSent(function (Request $request) {
        $system = $request['messages'][0]['content'];

        return $request->url() === 'https://api.openai.test/v1/chat/completions'
            && $request->hasHeader('Authorization', 'Bearer test-key')
            && $request['model'] === 'gpt-4.1-mini'
            && str_contains($system, '- campaigns:') && str_contains($system, '- lead_conversion_by_agent:')
            && $request['messages'][1]['content'] === 'Which campaign is best this week?'
            && ! str_contains(json_encode($request->data()), 'Secret Campaign Name');
    });
});

test('the plan drops unknown ids, tolerates code fences and clamps the period', function () {
    fakeOpenAi("```json\n{\"sources\":[\"campaigns\",\"passwords\",\"campaigns\"],\"days\":9999}\n```");

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.plan'), ['message' => 'anything'])
        ->assertOk()
        ->assertJsonCount(1, 'sources')
        ->assertJsonPath('sources.0.id', 'campaigns')
        ->assertJsonPath('days', 365);
});

test('an unreadable plan falls back to the overview instead of failing', function () {
    fakeOpenAi('sorry, I cannot help with that');

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.plan'), ['message' => 'anything'])
        ->assertOk()
        ->assertJsonPath('sources.0.id', 'overview')
        ->assertJsonPath('days', 30);
});

test('answering attaches only the requested data and keeps lead contact details out', function () {
    $campaign = Campaign::factory()->create(['name' => 'Spring FHA']);
    Lead::factory()->create(['campaign_id' => $campaign->id, 'email' => 'private.person@example.com', 'full_name' => 'Private Person', 'phone' => '5045550199']);
    fakeOpenAi('Spring FHA leads with **1** lead.');

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.answer'), [
            'message' => 'How is Spring FHA doing?',
            'history' => [['role' => 'user', 'content' => 'hello'], ['role' => 'assistant', 'content' => 'hi there']],
            'sources' => ['campaigns', 'leads'],
            'days' => 30,
        ])
        ->assertOk()
        ->assertJson(['answer' => 'Spring FHA leads with **1** lead.']);

    Http::assertSent(function (Request $request) {
        $payload = json_encode($request->data());
        $last = collect($request['messages'])->last()['content'];

        return str_contains($last, '"campaigns"') && str_contains($last, 'Spring FHA')
            && str_contains($last, 'Question: How is Spring FHA doing?')
            && ! str_contains($last, 'top_pages') && ! str_contains($last, '"geography"')
            && ! str_contains($payload, 'private.person@example.com')
            && ! str_contains($payload, 'Private Person')
            && ! str_contains($payload, '5045550199')
            && collect($request['messages'])->pluck('role')->all() === ['system', 'user', 'assistant', 'user'];
    });
});

test('answering rejects unknown sources and oversized questions', function () {
    $this->actingAs(User::factory()->create());

    $this->postJson(route('dashboard.ai.answer'), ['message' => 'x', 'sources' => ['users_table'], 'days' => 30])
        ->assertJsonValidationErrors('sources.0');

    $this->postJson(route('dashboard.ai.plan'), ['message' => str_repeat('a', 1001)])
        ->assertJsonValidationErrors('message');

    $this->postJson(route('dashboard.ai.answer'), ['message' => 'x', 'sources' => [], 'days' => 0])
        ->assertJsonValidationErrors('days');
});

test('a missing API key is reported as unavailable', function () {
    config(['services.openai.key' => null]);
    Http::preventStrayRequests();

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.plan'), ['message' => 'hello'])
        ->assertStatus(503)
        ->assertJsonPath('message', 'AI is not configured. Add OPENAI_API_KEY to your .env file.');
});

test('a provider error is reported as unavailable without leaking details', function () {
    Http::preventStrayRequests();
    Http::fake(['api.openai.test/*' => Http::response(['error' => ['message' => 'Incorrect API key provided: sk-secret']], 401)]);

    $this->actingAs(User::factory()->create())
        ->postJson(route('dashboard.ai.answer'), ['message' => 'hello', 'sources' => [], 'days' => 30])
        ->assertStatus(503)
        ->assertJsonMissing(['message' => 'Incorrect API key provided: sk-secret']);
});
