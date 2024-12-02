<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Firestore\FieldValue\ServerTimestampValue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Google\Cloud\Firestore\FirestoreClient;

class TopupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Topup/Index');
    }
    /**
     * Display a listing of the resource.
     */
    public function addTopUp($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);

        $user = $firebaseUser->snapshot()->data();

        $firebaseUser->update([
            ['path' => 'topup', 'value' => [
                'name' => $user['name'],
                'start' => Carbon::now(),
                'status' => true,
            ]]
        ]);
        return to_route('admin.agents');
    }

    public function removeTopUp($uid)
    {
        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('users')->document($uid);


        $firebaseUser->update([
            ['path' => 'topup', 'value' => null]
        ]);

        return to_route('admin.users');
    }
}
