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
        Schema::create('order_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->enum('old_status', ['pending','confirmed','shipping','completed','canceled'])->nullable()->default(null);
            $table->enum('new_status', ['pending','confirmed','shipping','completed','canceled'])->default('pending');
            $table->foreignId('action_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('note')->nullable();
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_logs');
    }
};
