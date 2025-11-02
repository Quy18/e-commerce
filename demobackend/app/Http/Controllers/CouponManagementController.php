<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponManagementController extends Controller
{
    //
    public function getAllCoupon () {
        $user = auth()->user();
        if(!$user){
            return response([
                'message' => 'User is not define',
            ], 404);
        }
        $arrCoupon = Coupon::select('id', 'code', 'type', 'value', 'min_order_value', 'usage_limit', 'used_count', 'start_date', 'end_date', 'is_active', 'created_at')->orderBy('created_at', 'desc')->paginate(10);
        return response([
            'message' => 'Get all coupon succesfully',
            'data' => $arrCoupon,
        ], 200);
    }
}
