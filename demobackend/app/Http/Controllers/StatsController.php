<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    //
    public function getStats (){
        $user = auth()->user();
        if(!$user){
            return response()->json([
                'message' => 'User is not found',
            ], 404);
        }
        $users = User::all()->count();
        $products = Product::all()->count();
        $orders = Order::all()->count();
        $coupons = Coupon::all()->count();
        return response()->json([
            'message' => 'Get Stats successfully',
            'users' => $users,
            'products' => $products,
            'orders' => $orders,
            'coupons' => $coupons,
        ], 200);
    }
}
