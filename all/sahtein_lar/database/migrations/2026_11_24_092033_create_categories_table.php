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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
			$table->string('categories_name');
			$table->enum('type', ['cuisine', 'meal_type', 'dietary_goal']);
            $table->timestamps();
			// Prevents duplicate entries like two "Dinner" meal_type rows
			$table->unique(['name', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
