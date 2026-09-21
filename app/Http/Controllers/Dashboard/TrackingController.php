<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTrackingSettingsRequest;
use App\Models\TrackingSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrackingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('dashboard/tracking', ['settings' => TrackingSetting::shared()]);
    }

    public function update(UpdateTrackingSettingsRequest $request): RedirectResponse
    {
        TrackingSetting::store($request->validated());

        return back()->with('status', 'tracking-updated');
    }
}
