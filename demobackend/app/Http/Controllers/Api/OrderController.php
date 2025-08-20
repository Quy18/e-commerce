<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Product;

class OrderController extends Controller
{
    // This method will handle all of the orders of the user
    public function index(){
        $orders = Order::where('user_id', auth()->id())->get();
        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'No orders found for this user',
            ], 404);
        }
        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data' => $orders,
        ], 200);
    }

    // Xem chi tiết đơn hàng 
    public function showOrderDetails($id){
        $order = Order::where('user_id', auth()->id())->where('id', $id)->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
            ], 404);
        }

        $orderItems = OrderItem::where('order_id', $order->id)->get();

        if ($orderItems->isEmpty()) {
            return response()->json([
                'message' => 'No items found for this order',
            ], 404);
        }

        return response()->json([
            'message' => 'Order details retrieved successfully',
            'data' => [
                'order' => $order,
                'items' => $orderItems,
            ],
        ], 200);
    }

    // Tạo đơn hàng mới trong giỏ hàng
    public function createOrderWithCart(Request $request){
        $request->validate([
            'cart_id' => 'required|exists:carts,id',
        ]);

        $cart = Cart::where('user_id', auth()->id())->where('id', $request->cart_id)->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Cart not found',
            ], 404);
        }

        $cartItems = CartItem::where('cart_id', $cart->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty',
            ], 400);
        }

        $user = User::find(auth()->id());

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $cart->total_price,
            'shipping_address' => $user->address,
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);
        }

        $orderItems = OrderItem::where('order_id', $order->id)->get();

        // Clear the cart after creating the order
        CartItem::where('cart_id', $cart->id)->delete();

        // Clear the cart
        Cart::where('id', $cart->id)->delete();

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
            'items' => $orderItems,
        ], 201);
    }

    // Tạo trực tiếp đơn hàng mới
    public function createOrderDirect(Request $request){
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        $user = User::find(auth()->id());

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_amount' => $product->price * $request->quantity,
            'shipping_address' => $user->address,
        ]);

        $orderItem = OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'price' => $product->price,
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
            'item' => $orderItem,
        ], 201);
    }
}
