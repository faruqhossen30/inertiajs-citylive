<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransctionController extends Controller
{
    public function todaySendTransction(): Response{
        return Inertia::render('Admin/Transction/TodayTransctionSend');
    }
}
