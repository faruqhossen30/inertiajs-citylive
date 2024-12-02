<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepositController extends Controller
{
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
        return Inertia::render('Admin/User/Deposit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $diamond_password = Auth::user()->diamond_password;

        $request->validate(
            [
                'diamond' => 'required',
                'password' => "required |in:{$diamond_password}",
            ],
            [
                'password.in' => "Diamond secret password is wrong !"
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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


    public function createTopup() {

        // return 1;
        return Inertia::render('Admin/User/TopUp');
    }


    public function storeTopup(Request $request) {

        $diamond_password = Auth::user()->diamond_password;

        $request->validate(
            [
                'diamond' => 'required',
                'password' => "required |in:{$diamond_password}",
            ],
            [
                'password.in' => "Diamond secret password is wrong !"
            ]
        );

    }


}
