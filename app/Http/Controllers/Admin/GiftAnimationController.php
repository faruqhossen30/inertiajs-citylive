<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GiftAnimation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GiftAnimationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $animations = GiftAnimation::get();
        return Inertia::render('Admin/GiftAnimation/Index',['animations'=>$animations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/GiftAnimation/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required'
        ]);

        $data=[
            'name'=> $request->name,
            'size'=> $request->size,
            'dimond'=> $request->dimond,
        ];
        if ($request->file('photoURL')) {
            $file_name = $request->file('photoURL')->store('Gift/Animation');
            $data['photoURL'] = $file_name;
        }

        GiftAnimation::create($data);

        return to_route('animation.index');
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
        $animation = GiftAnimation::findOrFail($id);
        Storage::delete($animation->photoURL ?? '');
        $animation->delete();
        return redirect()->route('animation.index')->with('success', 'data successfully Deleted');
    }
}
