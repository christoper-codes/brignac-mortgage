<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\DashboardStats;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request, DashboardStats $stats): Response
    {
        $days = in_array($request->integer('range'), [7, 30, 90], true) ? $request->integer('range') : 30;

        return Inertia::render('dashboard/analytics', $stats->analytics($days));
    }
}
