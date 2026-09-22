<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTrackingSettingsRequest;
use App\Models\TrackingSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TrackingController extends Controller
{
    public function edit(): Response
    {
        $token = TrackingSetting::metaCapiToken();

        return Inertia::render('dashboard/tracking', [
            'settings' => [
                ...TrackingSetting::shared(),
                'metaTestEventCode' => TrackingSetting::metaTestEventCode(),
                // The token itself never reaches the browser — only whether one is saved, and its
                // last 4 characters so the field reads like every other "secret is set" UI.
                'metaCapiTokenPreview' => $token ? '••••'.Str::substr($token, -4) : null,
            ],
        ]);
    }

    public function update(UpdateTrackingSettingsRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Leaving the token field blank keeps the saved token; only a typed value replaces it, and
        // only the explicit checkbox removes it. Otherwise every save (e.g. just changing the GA4 ID)
        // would silently wipe out Meta's server-side conversions.
        if ($data['meta_capi_token'] === null && ! $request->boolean('clear_meta_capi_token')) {
            unset($data['meta_capi_token']);
        }

        unset($data['clear_meta_capi_token']);

        TrackingSetting::store($data);

        return back()->with('status', 'tracking-updated');
    }
}
