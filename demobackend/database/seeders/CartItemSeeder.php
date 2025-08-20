<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CartItem;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        CartItem::insert([
            [
                'cart_id' => 1,
                'product_id' => 1,
                'quantity' => 2,
                'price' => 100.00,
            ],
            [
                'cart_id' => 1,
                'product_id' => 2,
                'quantity' => 1,
                'price' => 150.00,
            ],
            [
                'cart_id' => 2,
                'product_id' => 4,
                'quantity' => 1,
                'price' => 50.00,
            ],
        ]);
    }
}
