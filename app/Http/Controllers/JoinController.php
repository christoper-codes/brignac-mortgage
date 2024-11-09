<?php

namespace App\Http\Controllers;

use App\Models\Join;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JoinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            return Inertia::render('Guest/Join');

        } catch(\Exception $e){
            return response()->json([
                "Message" => "Error to get join our team view",
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
    public function show(Join $join)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Join $join)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Join $join)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Join $join)
    {
        //
    }
}
