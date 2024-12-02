<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EntryFrame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EntryFrameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $frames = EntryFrame::get();
        return Inertia::render('Admin/EntryFrame/Index',['frames'=>$frames]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/EntryFrame/Create');
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
            $file_name = $request->file('photoURL')->store('Frame');
            $data['photoURL'] = $file_name;
        }

        EntryFrame::create($data);

        return to_route('frame.index');
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
        $frame = EntryFrame::findOrFail($id);
        Storage::delete($frame->photoURL ?? '');
        $frame->delete();
        return redirect()->route('frame.index')->with('success', 'data successfully Deleted');
    }
}
