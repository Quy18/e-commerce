<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class CategoryController extends Controller
{
    //
    public function index()
    {
        // Logic to handle the request and return categories
        $categoryData = Category::all();
        if ($categoryData->isEmpty()) {
            return response()->json(['message' => 'No categories found'], 404);
        }
        return response()->json($categoryData);
    }

    // Show products by category ID 
    public function showProductByCateId($id)
    {
        // Logic to handle the request and return a specific category by ID
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $products = Product::where('category_id', $id)->get();
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found for this category']);
        }
        return response()->json(['products' => $products]);
    }
}
