<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;

class ProductController extends Controller
{
    //xem danh sách sản phẩm
    public function index()
    {
        // Logic to fetch and return the list of products
        $products = Product::all();
        return response()->json([
            'massage' => 'List of products',
            'data' => $products,
        ], 200);
    }

    //xem chi tiết sản phẩm
    public function show($id)
    {
        // Logic to fetch and return a single product by ID
        $product = Product::findOrFail($id);
        return response()->json([
            'message' => 'Product details',
            'data' => $product,
        ], 200);
    }

    //tìm kiếm sản phẩm theo tên
    public function search(Request $request)
    {
        // Logic to search products based on query parameters
        $query = $request->query('query');

        if (!$query || !is_string($query) || strlen($query) > 255) {
            return response()->json(['error' => 'Invalid search query'], 400);
        }

        $query = strtolower($query);

        $products = Product::whereRaw('LOWER(name) LIKE ?', ['%' . $query . '%'])->paginate(10);

        if ($products->total() === 0) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return response()->json([
            'message' => 'Search results',
            'data' => $products,
        ], 200);
    }

    //lọc sản phẩm theo giá
    //sản phẩm liên quan
}
