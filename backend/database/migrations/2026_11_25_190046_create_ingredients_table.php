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
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
			$table->string('name');
			// $table->string('name_ar');
			$table->double('calories_per_100g');
			$table->double('protein_per_100g');
			$table->double('carbohydrates_per_100g');
			$table->double('fat_per_100g');
			$table->double('fiber_per_100g');
			$table->string('default_unit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredients');
    }
};
