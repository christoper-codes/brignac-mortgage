<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\DashboardRangeRequest;
use App\Services\DashboardStats;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __invoke(DashboardRangeRequest $request, DashboardStats $stats): Response
    {
        return Inertia::render('dashboard/analytics', [
            ...$stats->analytics(...$request->window()),
            'range' => $request->selection(),
        ]);
    }
}
