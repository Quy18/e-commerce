<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminController extends Controller
{
    public function login(Request $request){
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password'=> 'required|string',
        ]);
        $user = User::where('email', $validatedData['email'])->first();
        if(!$user || !Hash::check($validatedData['password'], $user->password)){
            return response()->json([
                'message'=> 'User undefined'
            ], 401);
        }
        if($user->role != 'admin'){
            return response()->json([
                'message'=> 'You do not have permission to log in to the application',
            ], 403);
        }
        $token = $user->createToken('admin_token')->plainTextToken;
        // Cắt token lấy phần sau dấu "|"
        $tokenParts = explode('|', $token, 2);
        $tokenOnly = $tokenParts[1] ?? $token;
        
        return response()->json([
            'message' => 'Login successfully',
            'token' => $tokenOnly,
            'user' => $user
        ],200);
    }

    public function logout(Request $request){
        $user = $request->user();

        if(!$user){
            return response()->json([
                'message'=> 'User does not exist.'
            ],404);
        }
        if($user->role != 'admin'){
            return response()->json([
                'message'=> 'You do not have permission.',
            ],403);
        }
        $user->currentAccessToken()->delete();
        return response()->json([
            'message'=> 'Logout successfully',
        ],200);
    }
}
