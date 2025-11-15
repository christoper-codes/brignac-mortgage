<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use App\Mail\TestMailable;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{

    public function sendEmail(Request $request)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                'email' => 'required|email',
                'name' => 'required',
                'message' => 'required',
                'is_hiring' => 'required',
                'files' => 'nullable'
            ]);

            $details = [
                'email' => $request->email,
                'title' => $request->name,
                'body' => $request->message,
                'is_hiring' => $request->is_hiring,
                'files' => $request->files ?? []
            ];

            $filePaths = [];
            if($request->hasFile('files')){
                foreach ($request->file('files') as $file) {
                    $path = $file->store('uploads', 'public');
                    $filePaths[] = $path;
                }
            }

            $filesString = implode(',', $filePaths);

            Email::create([
                'email' => $request->email,
                'subject' => $request->name,
                'message' => $request->message,
                'is_hiring' => $request->is_hiring ? 1 : 0,
                'files' => $filesString
            ]);


            Mail::to('shaun@brignacmortgage.com')->send(new TestMailable($details, $filePaths));//shaun@brignacmortgage.com
            Mail::to('eh2002cc415@ueh.edu.mx')->send(new TestMailable($details, $filePaths));
            Log::info('Email enviado correctamente a ' . $request->email);
            DB::commit();
            return response()->json([
                'message' => 'The message has been sent successfully',
                'data' => $filePaths,
                'success' => true
            ], 200);

        } catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'data' => 'The message has failed',
                'message' => $e->getMessage(),
                'success' => false
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Email $email)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Email $email)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Email $email)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Email $email)
    {
        //
    }
}
