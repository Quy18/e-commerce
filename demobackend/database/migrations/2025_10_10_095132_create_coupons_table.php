<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type' ,['percent', 'fixed']);
            $table->decimal('value', 10, 2); //Giá trị giảm
            $table->decimal('min_order_value', 10, 2)->nullable();
            $table->integer('usage_limit')->nullable(); //Giới hạn số lần dùng
            $table->integer('used_count')->default(0); //Số lần đã dùng
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
