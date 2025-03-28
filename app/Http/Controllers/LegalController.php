<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalController extends Controller
{
    public function privacyPolicyForWebsite()
    {
        return Inertia::render('Legal/privacyPolicyForWebsite');
    }

    public function disclaimersForWebsite()
    {
        return Inertia::render('Legal/disclaimersForWebsite');
    }

    public function termsOfUseForWebsite()
    {
        return Inertia::render('Legal/termsOfUseForWebsite');
    }
}
