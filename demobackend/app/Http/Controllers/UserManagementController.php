<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    //
    public function getAllUser(){
        $user = auth()->user();
        if(!$user){
            return response()->json([
                'message' => 'User is not define.'
            ], 404);
        }

        $arrUser = User::where('id', '!=', $user->id)->select('id','name','image','email','role','status','created_at')->orderBy('created_at', 'desc')->paginate(10);
        return response()->json([
            'message' => 'Get all user successfully',
            'data' => $arrUser,
        ], 200);
    }
}
