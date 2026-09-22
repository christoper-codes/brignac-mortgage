<?php

namespace App\Jobs;

use App\Services\MetaConversionsApi;
use Illuminate\Foundation\Bus\Dispatchable;

/**
 * Dispatched after the response is sent (see dispatchAfterResponse), so a slow or unreachable Meta
 * API never delays the visitor's page load or form submission.
 */
class SendMetaConversionEvent
{
    use Dispatchable;

    /**
     * @param  array<string, mixed>  $userData
     * @param  array<string, mixed>  $customData
     */
    public function __construct(
        public string $eventName,
        public array $userData,
        public array $customData = [],
        public ?string $eventId = null,
        public ?string $sourceUrl = null,
    ) {}

    public function handle(MetaConversionsApi $api): void
    {
        $api->send($this->eventName, $this->userData, $this->customData, $this->eventId, $this->sourceUrl);
    }
}
