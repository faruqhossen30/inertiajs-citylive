<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Lib\RtmTokenBuilder;
use App\Models\Agora;
use Illuminate\Http\Request;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Cache;

class RtmctokenController extends Controller
{
    public function generate(Request $request)
    {

        // $appID = "858e98ae022643ee98cab45bab50fb84";
        // $appCertificate = "24eff318410546b3b51e415668b53d04";

        // $agora = Cache::rememberForever('agora', function () {
        //     return Agora::first();
        // });
        // Cache::flush();
        $agora = Agora::first();


        $appID = $agora->app_id;
        $appCertificate = $agora->app_certificate;

        $user = $request->user;
        $role = RtmTokenBuilder::RoleRtmUser;
        $expireTimeInSeconds = 86400;
        $currentTimestamp = (new DateTime("now", new DateTimeZone('Asia/Dhaka')))->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        $token = RtmTokenBuilder::buildToken($appID, $appCertificate, $user, $role, $privilegeExpiredTs);
        // echo 'Rtm Token: ' . $token . PHP_EOL;
        echo $token;
    }
}
