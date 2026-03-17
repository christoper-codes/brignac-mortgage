<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactUsController extends Controller
{
    public function index()
    {
        try {
            return Inertia::render('Guest/ContactUs');
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Error to get contact us view",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
