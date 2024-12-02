<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Google\Cloud\Firestore\FirestoreClient;

class UserController extends Controller
{
    // protected $firestore;

    // public function __construct()
    // {
    //     $this->firestore = new FirestoreClient([
    //         'projectId' => env('FIREBASE_PROJECT_ID')
    //     ]);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/User/Index');
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
    public function show(string $uid)
    {
        return Inertia::render('Admin/User/Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function deposit(string $uid)
    {

    }

    /**
     * Display the specified resource.
     */
    public function setAsHost(string $uid)
    {

    }

    public function disableAccount()
    {
        return "disable Account";
    }
}
