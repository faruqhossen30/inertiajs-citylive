<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Lib\RtcTokenBuilder;
use App\Models\Agora;
use Illuminate\Http\Request;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Cache;

class RtctokenController extends Controller
{
    public function generate(Request $request)
    {


        // include("../src/RtcTokenBuilder.php");
        // include("../../Lib/RtcTokenBuilder.php");


        // $appID = "858e98ae022643ee98cab45bab50fb84";
        // $appCertificate = "24eff318410546b3b51e415668b53d04";

        // $agora = Cache::rememberForever('agora', function () {
        //     return Agora::first();
        // });

        $agora = Agora::first();
        $appID = $agora->app_id;
        $appCertificate = $agora->app_certificate;

        $channelName = $request->channel;
        $uid = $request->uid;
        $uidStr = "2882341273";
        $role = RtcTokenBuilder::RolePublisher;
        $expireTimeInSeconds = 86400;
        $currentTimestamp = (new DateTime("now", new DateTimeZone('Asia/Dhaka')))->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        $token = RtcTokenBuilder::buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);
        // echo 'Token with int uid: ' . $token . PHP_EOL;
        // echo $token;
        $agora['channel']=$request->channel;
        $agora['rtc_token']=$token;
        return response()->json($agora);

        // $token = RtcTokenBuilder::buildTokenWithUserAccount($appID, $appCertificate, $channelName, $uidStr, $role, $privilegeExpiredTs);
        // echo 'Token with user account: ' . $token . PHP_EOL;

    }
}
