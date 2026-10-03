<?php

namespace App\Services;

use App\Exceptions\AiUnavailableException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

/**
 * Answers the admin's questions about the website in two cheap steps instead of one huge prompt:
 *
 *  1. plan():   the model only sees the *menu* of available data (ids + one-line descriptions) and the
 *               question, and says which pieces it needs and for how many days.
 *  2. answer(): we load just those pieces and ask again, this time with the data attached.
 */
class AiAssistant
{
    public const DEFAULT_DAYS = 30;

    public const MAX_DAYS = 365;

    public function __construct(private AiDataCatalog $catalog) {}

    public function isConfigured(): bool
    {
        return filled(config('services.openai.key'));
    }

    /**
     * Step 1 — decide which data is needed.
     *
     * @param  list<array{role: string, content: string, sources?: list<string>}>  $history
     * @return array{sources: list<string>, days: int}
     */
    public function plan(string $question, array $history = []): array
    {
        $system = <<<PROMPT
You route questions for the marketing dashboard of Brignac Mortgage, a Louisiana wholesale mortgage broker. Decide which website data is needed to answer the admin's question.
Reply with single-line JSON only, no markdown, no extra text: {"sources":["id",...],"days":N}
Rules:
- Use only ids from the catalog below, and pick the fewest that fully answer the question.
- A question about how to use the dashboard itself — where to find something, what a page shows, how a filter/search/export works, how a number is calculated — needs "dashboard_help", not a numbers source.
- A question about trends, patterns, what's changing, or what stands out needs both "daily_trend" and "long_term_trend" together (day-to-day detail plus the week/month shape), and any specific breakdown (campaigns, traffic_sources, geography, devices_browsers_os) the pattern could show up in.
- Use an empty list when no website data is needed: greetings, and general questions about advertising, marketing technology or mortgage lending.
- The question may be a follow-up ("what is its name?", "and last week?", "why?"). Read the recent conversation: assistant turns show the data they used as [data used: ...]. When the follow-up needs that same data (or more), select it again — data is not remembered between questions.
- "days" is the period the question is about (7, 30, 90...). Default {$this->defaultDays()} when not stated. Maximum {$this->maxDays()}.
Catalog:
{$this->catalog->menu()}
PROMPT;

        $raw = $this->chat([
            ['role' => 'system', 'content' => $system],
            ['role' => 'user', 'content' => $this->withHistory($question, $history)],
        ], maxTokens: 150, json: true);

        return $this->parsePlan($raw);
    }

    /**
     * Step 2 — answer with only the data the plan asked for.
     *
     * @param  list<array{role: string, content: string}>  $history
     * @param  list<string>  $sources
     */
    public function answer(string $question, array $history, array $sources, int $days): string
    {
        $days = $this->clampDays($days);
        $context = $this->catalog->resolve($sources, $days);
        $data = $context === [] ? 'No website data was needed for this question.' : json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $system = <<<'PROMPT'
You are the AI assistant inside the marketing dashboard of Brignac Mortgage, a Louisiana wholesale mortgage broker. You help the admin with five areas: (1) the website's own data, (2) ad campaigns (Meta/Facebook, Instagram, TikTok, Google), (3) marketing technology (pixels, Conversions API, UTM tracking, SEO, email, analytics), (4) mortgage lending (FHA, VA, USDA, conventional, jumbo, ARM, rates, pre-qualification, compliance basics), and (5) how to use this dashboard itself — what each page (Overview, Campaigns, Leads, Analytics, Pixels) shows, where to find something, how its filters/search work, how to export data to Excel, and how a number is calculated. The two conversions that matter, in order: 1) clicks on "Apply Now" (team member cards on /apply), 2) contact-form leads.
How to answer:
- Questions about the website's own numbers, or about how the dashboard works: use ONLY the data provided, be specific, and never invent numbers, names, routes or features. If a detail is not in the data (an email, a phone number, anything not provided), say plainly that it isn't available to you — never guess or make up a placeholder.
- General questions in areas 2-4 above: answer from your own expert knowledge — practical, concrete, tailored to a Louisiana mortgage broker when useful. When you combine both, make clear which part comes from their data and which is general advice.
- A "where/how do I..." question about the dashboard gets a concrete answer: name the page (and its URL when useful), what to click or filter, and what it does.
- When trend data (daily_trend, long_term_trend) is provided, don't just restate the numbers in order: call out what actually stands out — a rise or drop vs. the prior period, a day or week that spikes or dips, a steady direction, a correlation with a campaign or source. If nothing notable stands out, say that plainly instead of manufacturing a pattern.
- Follow the conversation: "it", "that lead", "the first one" refer to what was discussed earlier. Use the earlier turns to resolve them.
- If a question is unrelated to those areas, say briefly that it is outside what you help with and offer a relevant alternative.
- On regulated topics (rates, lending rules, mortgage advertising compliance) give general guidance and remind them to confirm with compliance or official sources when it matters.
Reply in the same language as the question. Plain text only: short paragraphs, "- " bullets for lists, **bold** for key figures; no headings, tables or code fences. Add one short, actionable suggestion only when it adds value.
PROMPT;

        $messages = [['role' => 'system', 'content' => $system]];

        foreach ($history as $turn) {
            $messages[] = ['role' => $turn['role'], 'content' => $turn['content']];
        }

        $messages[] = ['role' => 'user', 'content' => "Data (last {$days} days, JSON):\n{$data}\n\nQuestion: {$question}"];

        $answer = $this->chat($messages, maxTokens: 700);

        if ($answer === '') {
            throw new AiUnavailableException('The AI returned an empty answer.');
        }

        return $answer;
    }

    /**
     * @param  list<array{role: string, content: string}>  $messages
     */
    private function chat(array $messages, int $maxTokens, bool $json = false): string
    {
        if (! $this->isConfigured()) {
            throw new AiUnavailableException('AI is not configured. Add OPENAI_API_KEY to your .env file.');
        }

        $payload = [
            'model' => config('services.openai.model'),
            'max_tokens' => $maxTokens,
            'temperature' => 0.2,
            'messages' => $messages,
        ];

        if ($json) {
            $payload['response_format'] = ['type' => 'json_object'];
        }

        try {
            $response = Http::withToken((string) config('services.openai.key'))
                ->acceptJson()
                ->timeout(30)
                ->post(rtrim((string) config('services.openai.url'), '/').'/chat/completions', $payload);
        } catch (ConnectionException) {
            throw new AiUnavailableException('Could not reach the AI service. Try again in a moment.');
        }

        if ($response->failed()) {
            report(new AiUnavailableException("OpenAI responded with HTTP {$response->status()}."));

            throw new AiUnavailableException('The AI service returned an error. Try again in a moment.');
        }

        return trim((string) $response->json('choices.0.message.content', ''));
    }

    /**
     * @return array{sources: list<string>, days: int}
     */
    private function parsePlan(string $raw): array
    {
        $raw = preg_replace('/^```(?:json)?\s*/i', '', $raw) ?? $raw;
        $raw = preg_replace('/\s*```$/', '', trim($raw)) ?? $raw;
        $data = json_decode($raw, true);

        if (! is_array($data) || ! isset($data['sources']) || ! is_array($data['sources'])) {
            // An unreadable plan shouldn't dead-end the chat: the headline numbers are a safe default.
            return ['sources' => ['overview'], 'days' => self::DEFAULT_DAYS];
        }

        $sources = collect($data['sources'])
            ->filter(fn ($id): bool => is_string($id) && $this->catalog->has($id))
            ->unique()->values()->all();

        return ['sources' => $sources, 'days' => $this->clampDays($data['days'] ?? self::DEFAULT_DAYS)];
    }

    private function clampDays(mixed $days): int
    {
        return is_numeric($days) ? max(1, min(self::MAX_DAYS, (int) $days)) : self::DEFAULT_DAYS;
    }

    /**
     * @param  list<array{role: string, content: string}>  $history
     */
    private function withHistory(string $question, array $history): string
    {
        if ($history === []) {
            return $question;
        }

        $recent = collect($history)->map(function (array $turn): string {
            $used = collect($turn['sources'] ?? [])->filter(fn ($id): bool => is_string($id) && $this->catalog->has($id))->implode(', ');

            return $turn['role'].($used !== '' ? " [data used: {$used}]" : '').": {$turn['content']}";
        })->implode("\n");

        return "Recent conversation:\n{$recent}\n\nNew question: {$question}";
    }

    private function defaultDays(): int
    {
        return self::DEFAULT_DAYS;
    }

    private function maxDays(): int
    {
        return self::MAX_DAYS;
    }
}
