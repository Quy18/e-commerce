<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductManagementController extends Controller
{
    //
    public function getAllProduct () {
        $user = auth()->user();
        if(!$user){
            return response([
                'message' => 'User is not define',
            ], 404);
        }
        $arrProduct = Product::select('id', 'name', 'price', 'stock', 'image', 'description', 'created_at')->orderBy('id', 'asc')->paginate(10);
        return response([
            'message' => 'Get all product succesfully',
            'data' => $arrProduct,
        ], 200);
    }
}
