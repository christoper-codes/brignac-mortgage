<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\DashboardStats;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OverviewController extends Controller
{
    public function __invoke(Request $request, DashboardStats $stats): Response
    {
        return Inertia::render('dashboard', $stats->overview($this->days($request)));
    }

    private function days(Request $request): int
    {
        return in_array($request->integer('range'), [7, 30, 90], true) ? $request->integer('range') : 30;
    }
}
