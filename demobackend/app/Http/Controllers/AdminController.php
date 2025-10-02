<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

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

    public function updateProfile(Request $request){
        $user = auth()->user();

        if(!$user){
            return response()->json([
                'message'=> 'User not found.',
            ],404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            // Nếu user đã có ảnh cũ thì xóa ảnh đó
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }
            // Lưu file ảnh vào storage/app/public/avatars
            $path = $request->file('image')->store('avatars', 'public');
            $validatedData['image'] = $path;
        }

        $user->update($validatedData);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
            'imageurl' => $user->image ? url('storage/'.$user->image) : null,
        ]);
    }
}
