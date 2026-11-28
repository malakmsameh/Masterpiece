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
        Schema::create('dietary_preferences', function (Blueprint $table) {
            $table->id();
			$table->string('name');// EN: "Vegetarian"
			$table->string('name_ar');// AR: "نباتي"
			$table->string('slug')->unique();// "vegetarian"
			$table->text('description')->nullable();
			$table->text('description_ar')->nullable();
			$table->string('icon')->nullable();
			$table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dietary_preferences');
    }
};
