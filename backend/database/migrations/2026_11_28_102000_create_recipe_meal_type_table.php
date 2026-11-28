<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipe_meal_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->foreignId('meal_type_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['recipe_id', 'meal_type_id'], 'recipe_meal_type_pair_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_meal_type');
    }
};
