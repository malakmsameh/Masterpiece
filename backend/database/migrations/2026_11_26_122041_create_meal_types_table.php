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
        Schema::create('meal_types', function (Blueprint $table) {
            $table->id();
			$table->string('name');// EN: "Breakfast"
			$table->string('name_ar');// AR: "فطور"
			$table->string('slug')->unique();// "breakfast"
			$table->integer('sort_order')->default(0); // admin-controlled display order
			$table->boolean('is_active')->default(true);
			$table->timestamps();
			$table->index(['sort_order', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_types');
    }
};
