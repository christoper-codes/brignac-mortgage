<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\DashboardRangeRequest;
use App\Services\DashboardStats;
use Inertia\Inertia;
use Inertia\Response;

class OverviewController extends Controller
{
    public function __invoke(DashboardRangeRequest $request, DashboardStats $stats): Response
    {
        return Inertia::render('dashboard', [
            ...$stats->overview(...$request->window()),
            'range' => $request->selection(),
        ]);
    }
}
