<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Coupon::create([
            'code' => 'TEST',
            'type' => 'percent',
            'value' => 5.00,
            'min_order_value' => 0,
            'usage_limit' => 10,
            'start_date' => Carbon::now()->subDays(2),
            'end_date' => Carbon::now()->addDays(10),
            'is_active' => true,
        ]);
        Coupon::create([
            'code' => 'TEST2',
            'type' => 'percent',
            'value' => 10.00,
            'min_order_value' => 50,
            'usage_limit' => 20,
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addDays(14),
            'is_active' => true,
        ]);
    }
}
