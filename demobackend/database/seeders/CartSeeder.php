<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cart;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Cart::insert([
            [
                'user_id' => 1,
                'total_price' => 250.00,
            ],
            [
                'user_id' => 2,
                'total_price' => 50.00,
            ],
        ]);
    }
}
