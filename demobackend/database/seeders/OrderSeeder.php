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
        Order::insert([
            [
                'user_id' => 1,
                'total_amount' => 250.00,
                'status' => 'pending',
                'shipping_address' => '123 Main St, City, Country',
            ],
            [
                'user_id' => 2,
                'total_amount' => 450.00,
                'status' => 'completed',
                'shipping_address' => '456 Elm St, City, Country',
            ]
        ]);
    }
}
