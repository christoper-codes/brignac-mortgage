<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Dashboard;
use App\Models\Email;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $about_us = AboutUs::first();

            return Inertia::render('App/Dashboard', [
                'about_us' => $about_us
            ]);

        } catch(\Exception $e){
            return response()->json([
                "Message" => "Error to get dashboard view",
                "Error" => $e->getMessage()
            ]);
        }
    }

    public function indexInterestedClients()
    {
        try {
            $emails = Email::where('is_hiring', false)->orderBy('created_at', 'desc')->get();

            return Inertia::render('App/InterestedClients', [
                'emails' => $emails
            ]);

        } catch(\Exception $e){
            return response()->json([
                "Error" => $e->getMessage()
            ]);
        }
    }

    public function indexCandidatesForHiring()
    {
        try {
            $emails = Email::where('is_hiring', true)->orderBy('created_at', 'desc')->get();
            return Inertia::render('App/CandidatesForHiring', [
                'emails' => $emails
            ]);
        } catch(\Exception $e){
            return response()->json([
                "Error" => $e->getMessage()
            ]);
        }
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }
}
