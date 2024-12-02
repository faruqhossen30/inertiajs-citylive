<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AvatarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avatars = Avatar::get();
        return Inertia::render('Admin/Avatar/Index',['avatars' =>  $avatars]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Avatar/Create');
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
            $file_name = $request->file('photoURL')->store('Avatar');
            $data['photoURL'] = $file_name;
        }

        Avatar::create($data);

        return to_route('avatar.index');
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
        $avatar = Avatar::findOrFail($id);
        Storage::delete($avatar->photoURL ?? '');
        $avatar->delete();
        return redirect()->route('avatar.index')->with('success', 'data successfully Deleted');
    }
}
