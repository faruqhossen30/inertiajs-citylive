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


    public function deposit(string $uid) {}

    /**
     * Display the specified resource.
     */
    public function setAsHost(string $uid) {}

    public function disableAccount()
    {
        return "disable Account";
    }

    public function toggleDiamondLock($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);

        $user = $firebaseUser->snapshot()->data();

        $firebaseUser->update([
            ['path' => 'lockDiamond', 'value' => !$user['lockDiamond']]
        ]);
        // return to_route('admin.users');
        return redirect()->back();
    }

    public function vipToggle($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);

        $user = $firebaseUser->snapshot()->data();

        $firebaseUser->update([
            ['path' => 'vip', 'value' => !$user['vip']]
        ]);
        // return to_route('admin.users');
        return redirect()->back();
    }


    public function vvipToggle($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);

        $user = $firebaseUser->snapshot()->data();

        $firebaseUser->update([
            ['path' => 'vvip', 'value' => !$user['vvip']]
        ]);
        // return to_route('admin.users');
        return redirect()->back();
    }


    public function diviceBlockToggle($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);

        $user = $firebaseUser->snapshot()->data();

        $firebaseUser->update([
            ['path' => 'deviceBlock', 'value' => !$user['deviceBlock'] ?? false]
        ]);

        if(!$user['deviceBlock']){
            $bloc = $firestore->collection('blocks')->document($user['deviceId'])->set([
                'userRef'=> $firebaseUser,
                'deviceId'=> $user['deviceId']
            ]);
        }else{
            $bloc = $firestore->collection('blocks')->document($user['deviceId'])->delete();
        }


        // return to_route('admin.users');
        return to_route('admin.users');
    }


}
