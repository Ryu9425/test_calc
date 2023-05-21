<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
        /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request  
     */
    public function getAllUsers(Request $request)
    {         
        $users = User::all();       
       
        return response()->json(['status'=>'ok','datas'=>$users]);
    }
}
