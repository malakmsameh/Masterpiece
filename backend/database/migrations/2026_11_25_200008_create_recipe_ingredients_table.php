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
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
			// recipe_id	BIGINT FK
			// ingredient_id	BIGINT FK
			// $table->double('quantity');
			// $table->string('unit');
			// $table->text("notes");
			// $table->text("notes_ar");

			$table->foreignId('recipe_id')->constrained('recipes')->cascadeOnDelete();
			$table->foreignId('ingredient_id')->constrained('ingredients')->restrictOnDelete();
			$table->decimal('quantity', 10, 2);
			$table->string('unit');
			$table->text('notes')->nullable();
			$table->text('notes_ar')->nullable();
			// prevents adding the same ingrediangt more than once 
			$table->unique(['recipe_id', 'ingredient_id']);
			$table->timestamps();
			});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_ingredients');
    }
};
