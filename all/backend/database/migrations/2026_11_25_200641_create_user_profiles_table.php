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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();

// user_id	BIGINT FK	References users
			$table->double('height_cm');
			$table->double('current_weight');
			$table->double('target_weight');
			$table->enum('activity_level',['light','moderate','active']);
			$table->enum('fitness_goal',['Lose','maintain','gain','bulk']);
			//Calculated or manually set
			$table->integer('daily_calorie_target');
			// In milliliters
			$table->integer('daily_water_target');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
