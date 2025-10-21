<?php

namespace App\Services;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Coupon;

class StatsService
{
    public function getStats(): array
    {
        return [
            'users' => User::count(),
            'products' => Product::count(),
            'orders' => Order::count(),
            'coupons' => Coupon::count(),
        ];
    }
}

?>