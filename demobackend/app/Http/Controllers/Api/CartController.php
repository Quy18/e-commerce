<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    // Show the user's cart
    public function show(){
        $cart = Cart::where('user_id', auth()->id())->first();
        
        if (!$cart) {
            return response()->json(['message' => 'Cart is empty'], 404);
        }

        $cartItems = CartItem::where('cart_id', $cart->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'No items in cart'], 404);
        }

        return response()->json([
            'message' => 'Cart items retrieved successfully',
            'data' => $cart,
            'items' => $cartItems,
        ], 200);
    }

    // Create a new cart item
    public function createCart(){
        $cart = Cart::find(auth()->id());
        if (!$cart) {
            Cart::create(['user_id' => auth()->id()]);
            return response()->json(['message' => 'Cart created successfully'], 201);
        }
        return response()->json(['message' => 'Cart already exists'], 200);
    }

    // Add an item to the cart
    public function addItem(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $price = Product::find($request->product_id)->price;

        // Tìm hoặc tạo giỏ hàng
        $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

        // Tìm xem sản phẩm đã có trong giỏ chưa
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // Nếu đã tồn tại, cập nhật số lượng và giá
            $cartItem->quantity += $request->quantity;
            $cartItem->price += $price * $request->quantity;
            $cartItem->save();
        } else {
            // Nếu chưa có, tạo mới
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $price * $request->quantity,
            ]);
        }

        // Cập nhật tổng giá trị giỏ hàng
        $cart->total_price += $price * $request->quantity;
        $cart->save();

        return response()->json([
            'message' => 'Item added to cart successfully',
            'cart' => $cart,
            'item' => $cartItem,
        ], 201);
    }

    // Remove an item from the cart
    public function removeItem(Request $request){
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where('user_id', auth()->id())->first();
        
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        // Cập nhật tổng giá trị giỏ hàng
        $cart->total_price -= $cartItem->price;
        $cart->save();

        // Xóa mục khỏi giỏ hàng
        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart successfully',
            'cart' => $cart,
        ], 200);
    }

    public function updateItem(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0',
        ]);
        
        $cart = Cart::where('user_id', auth()->id())->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        if ($request->quantity <= 0) {
            // If quantity is 0 or less, remove the item
            $cartItem->delete();
            $cart->total_price -= $cartItem->price;
            $cart->save();
            return response()->json([
                'message' => 'Item removed from cart',
                'cart' => $cart,
            ], 200);
        } else {
            $quantityItem = $cartItem->quantity;

            // Update the quantity and price
            $price = Product::find($request->product_id)->price;
            $cartItem->quantity = $request->quantity;
            $cartItem->price = $price * $request->quantity;
            $cartItem->save();

            // Update the total price of the cart
            $cart->total_price += ($request->quantity - $quantityItem) * $price;
            $cart->save();

            return response()->json([
                'message' => 'Cart item updated successfully',
                'item' => $cartItem,
                'cart' => $cart,
            ], 200);
        }
    }
}
