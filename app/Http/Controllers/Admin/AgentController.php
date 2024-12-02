<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Google\Cloud\Firestore\FirestoreClient;


class AgentController extends Controller
{
    protected $firestore;

    public function __construct()
    {
        $this->firestore = new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Agent/Index');
    }

    public function hostList()
    {
        return Inertia::render('Admin/Agent/Index');
    }


    public function agentRemove($uid)
    {
        $firebaseUser = $this->firestore->collection('users')->document($uid);

        $firebaseUser->update([
            ['path' => 'agent', 'value' =>  null]
        ]);
        return to_route('admin.agents');
    }
}
