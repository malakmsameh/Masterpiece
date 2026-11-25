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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
			// 	category_id	BIGINT FK	Recipe category
			// created_by	BIGINT FK NULL	User who created it, if applicable
			$table->string('title');
			// $table->string('title_ar');
			$table->text('description');
			$table->text('instructions');
			$table->string('image');
			$table->integer('preparation_time');
			$table->integer('cooking_time');
			$table->integer('servings');
			$table->double('calories_per_serving');
			$table->double('protein_per_serving');
			$table->double('carbs_per_serving');
			$table->double('fat_per_serving');
			$table->double('fiber_per_serving');
			$table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
			$table->enum('source_type', ['admin', 'ai', 'user'])->default('user');
			$table->boolean('is_public')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
