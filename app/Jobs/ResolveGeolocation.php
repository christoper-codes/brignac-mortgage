<?php

namespace App\Jobs;

use App\Services\IpGeolocator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;

/**
 * Fills the country / state / city columns of a visit, click or lead from its stored IP. Dispatched
 * after the response is sent so a slow lookup never delays the visitor.
 */
class ResolveGeolocation
{
    use Dispatchable;

    public function __construct(public Model $record) {}

    public function handle(IpGeolocator $geolocator): void
    {
        $location = $geolocator->lookup($this->record->ip_address);

        if ($location !== []) {
            $this->record->forceFill($location)->save();
        }
    }
}
