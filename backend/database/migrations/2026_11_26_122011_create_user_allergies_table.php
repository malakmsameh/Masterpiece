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
        Schema::create('user_allergies', function (Blueprint $table) {
            $table->id();
			$table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
			$table->foreignId('allergy_id')->constrained('allergies')->cascadeOnDelete();
			$table->enum('severity', ['mild', 'moderate', 'severe'])->default('moderate');
			$table->text('notes')->nullable();
			$table->text('notes_ar')->nullable();
			$table->timestamps();
			$table->unique(['user_id', 'allergy_id']); // one row per user-allergy pair
			$table->index('allergy_id');// "who's allergic to X"
		});
	}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_allergies');
    }
};
