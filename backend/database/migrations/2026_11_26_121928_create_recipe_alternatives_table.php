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
        Schema::create('recipe_alternatives', function (Blueprint $table) {
            $table->id();
			$table->foreignId('original_recipe_id')->constrained('recipes')->cascadeOnDelete();
			$table->foreignId('alternative_recipe_id')->constrained('recipes')->cascadeOnDelete();
			$table->text('reason')->nullable();		  // EN: "Lower calorie, less oil"
			$table->text('reason_ar')->nullable();	   // AR: "سعرات أقل، زيت أقل"
			$table->integer('calorie_difference')->nullable(); // negative = fewer calories
			$table->timestamps();
			$table->unique(['original_recipe_id', 'alternative_recipe_id'], 'recipe_alternatives_pair_unique');
			$table->index('original_recipe_id');
		});
	}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_alternatives');
    }
};
