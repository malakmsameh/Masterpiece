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
			// $table->userid ->foriegn key
			$table->string('recipe_name');
			$table->text('description');
			$table->string('recipe_image');
			// try to do a recipe video if possible
			$table->unsignedInteger('prep_minutes');
			$table->unsignedInteger('cook_minutes');
			$table->unsignedInteger('protein_g');
			$table->unsignedInteger('carbs_g');
			$table->unsignedInteger('fiber_g');
			$table->unsignedInteger('fat_g');
			// something called allergens 
			$table->enum('status', ['draft', 'pending','published','rejected'])->default('pending');
			$table->text('review_note');
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
