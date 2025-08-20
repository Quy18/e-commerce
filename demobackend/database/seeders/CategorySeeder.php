<?php

namespace Database\Seeders;
use App\Models\Category;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::insert([
            [
                'name' => 'Danh muc 1',
                'description' => 'Devices and gadgets',
                'image_url' => 'https://example.com/images/electronics.jpg',
            ],
            [
                'name' => 'Danh muc 2',
                'description' => 'Fashion and apparel',
                'image_url' => 'https://example.com/images/fashion.jpg',
            ],
        ]);
    }
}
