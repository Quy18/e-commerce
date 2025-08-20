<?php

namespace Database\Seeders;
use App\Models\Product;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
                'name' => 'Product 1',
                'description' => 'Description for Product 1',
                'price' => 50.00,
                'stock' => 50,
                'image' => 'product1.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Product 2',
                'description' => 'Description for Product 2',
                'price' => 150.00,
                'stock' => 30,
                'image' => 'product2.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Product 3',
                'description' => 'Description for Product 3',
                'price' => 200.00,
                'stock' => 20,
                'image' => 'product3.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Product 4',
                'description' => 'Description for Product 4',
                'price' => 50.00,
                'stock' => 60,
                'image' => 'product4.jpg',
                'category_id' => 2,
            ],
        ]);
    }
}
