<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderManagementController extends Controller
{
    //
    public function getAllOrder () {
        $user = auth()->user();
        if(!$user){
            return response([
                'message' => 'User is not define',
            ], 404);
        }
        $arrOrder = Order::select('id', 'status', 'created_at', 'total_payment', 'payment_status')->orderByRaw("FIELD(status, 'pending', 'confirmed', 'shipping', 'completed', 'cancelled')")->paginate(10);
        return response([
            'message' => 'Get all order succesfully',
            'data' => $arrOrder,
        ], 200);
    }
}
