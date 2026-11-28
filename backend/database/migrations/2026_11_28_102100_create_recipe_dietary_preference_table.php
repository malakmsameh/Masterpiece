<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipe_dietary_preference', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->foreignId('dietary_preference_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(
                ['recipe_id', 'dietary_preference_id'],
                'recipe_dietary_preference_pair_unique',
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_dietary_preference');
    }
};
