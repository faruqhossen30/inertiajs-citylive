<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Core\Timestamp;
use Google\Cloud\Firestore\FieldValue;
use Inertia\Inertia;
use Inertia\Response;

class WallpeperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Wallpaper/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Wallpaper/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'thumbnail' => 'required'
        ]);

        $data = [
            'name' => $request->name,
            'status' => true,
        ];

        // if ($request->file('thumbnail')) {
        //     $file_name = $request->file('thumbnail')->store('wallpager');
        //     $data['thumbnail'] = $file_name;
        // }
        // $db = new FirestoreClient([
        //     'projectId' => 'mklive-ba68e',
        // ]);

        // $db->collection('wallpapers')->add($data);

        // return to_route('wallpapers.index');
        return response()->json($data);
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
}
