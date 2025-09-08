<?php

namespace Database\Seeders;
use App\Models\Order;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Order::create([
            'user_id' => 1,
            'total_amount' => 250.00,
            'total_payment' => 255.00,
            'shipping_address' => '123 Main St, City, Country',
        ]);
          Order::create([
            'user_id' => 2,
            'status' => 'completed',
            'shipping_method' => 'express',
            'total_amount' => 450.00,
            'total_payment' => 460.00,
            'shipping_address' => '456 Elm St, City, Country',
          ]);
    }
}
