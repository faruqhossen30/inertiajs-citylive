<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilePhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Google\Cloud\Firestore\FirestoreClient;


class UserApiController extends Controller
{
    protected $firestore;

    public function __construct()
    {
        $this->firestore = new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);
    }

    public function avatar(Request $request, $uid)
    {

        // return "welcome";

        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240'
        ]);

        if ($request->file('avatar')) {
            $imagethumbnail = $request->file('avatar');
            $extension = $imagethumbnail->getClientOriginalExtension();
            $thumbnailname = Str::uuid() . '.' . $extension;

            $manager = new ImageManager(Driver::class);
            $img = $manager->read($request->file('avatar'));
            $img = $img->scale(720);

            $path_name = "avatar/" . $thumbnailname;
            $some = $img->save(public_path($path_name));


            ProfilePhoto::updateOrInsert(['uid' => $uid], ['uid' => $uid, 'photo' => $thumbnailname]);

            $firebaseUser = $this->firestore->collection('users')->document($uid);

            $firebaseUser->update([
                ['path' => 'photoURL', 'value' =>  url('/avatar').'/'.$thumbnailname]
            ]);


            return response()->json([
                'message' => "sucess",
                'some' => $some
            ]);
        }
    }
}
