<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OrderLog;

class OrderLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrderLog::create([
            'order_id' => 1,
            'new_status' => 'pending',
            'action_by' => 1,
            'note' => 'Admin tạo đơn hàng.'
        ]);
        OrderLog::create([
            'order_id' => 2,
            'new_status' => 'pending',
            'action_by' => 2,
            'note' => 'User tạo đơn hàng.'
        ]);
        OrderLog::create([
            'order_id' => 2,
            'old_status' => 'pending',
            'new_status'=> 'confirmed',
            'action_by' => 1,
            'note' => 'Admin xác nhận đơn hàng.'
        ]);
        OrderLog::create([
            'order_id' => 2,
            'old_status' => 'confirmed',
            'new_status' => 'shipping',
            'action_by' => 1,
            'note' => 'Đơn hàng đang được giao.'
        ]);
        OrderLog::create([
            'order_id' => 2,
            'old_status' => 'shipping',
            'new_status' => 'completed',
            'action_by' => 1,
            'note' => 'Đơn hàng đã được giao.'
        ]);
    }
}
