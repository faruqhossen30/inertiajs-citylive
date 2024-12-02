<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Cloud\Firestore\FirestoreClient;

class TestController extends Controller
{
    protected $firestore;

    public function __construct()
    {
        $this->firestore = new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);
    }

    public function index()
    {

        $collection = $this->firestore->collection('test'); // Replace 'users' with your collection name

        // Data to insert
        $data = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com'
        ];

        // Add the document
        $document = $collection->add($data);

        // Return the document ID
        return response()->json([
            'message' => 'Document added successfully!',
            'document_id' => $document->id(),
        ]);

    }
}
