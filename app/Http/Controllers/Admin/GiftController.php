<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Google\Cloud\Firestore\FirestoreClient;

class GiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Gift/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Gift/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate(
            [
                'name'    => 'required',
                'category'    => 'required',
                'diamond' => 'required',
                // 'img' => 'required|mimes:svga,gif,webp'
                'img' => 'required'
            ]
        );

        $data = [
            'name' => $request->name,
            'category' => $request->category,
            'diamond' => $request->diamond,
            // 'img'=> $request->img,
        ];

        if ($request->file('img')) {

            $file = $request->file('img');

            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $filePath = public_path('svga/');

            // Ensure the directory exists
            if (!file_exists($filePath)) {
                mkdir($filePath, 0777, true);
            }

            // Move the file
            $file->move($filePath, $fileName);

            $data['img'] = url('/svga').'/'.$fileName;
        }


        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);


        $firebaseUser = $firestore->collection('gifts')->add($data);


        return to_route('gifts.index');
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
