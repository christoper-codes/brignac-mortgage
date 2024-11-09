<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Dashboard;
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

    public function indexPrograms()
    {
        try {
            return Inertia::render('App/Programs');

        } catch(\Exception $e){
            return response()->json([
                "Error" => $e->getMessage()
            ]);
        }
    }

    public function indexTeam()
    {
        try {
            return Inertia::render('App/Team');

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
