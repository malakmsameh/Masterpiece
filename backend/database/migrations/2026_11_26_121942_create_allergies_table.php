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
        Schema::create('allergies', function (Blueprint $table) {
            $table->id();
			$table->string('name');// EN: "Sesame"
			$table->string('name_ar');// AR: "سمسم"
			$table->string('slug')->unique();// "sesame"
			$table->text('description')->nullable();
			$table->text('description_ar')->nullable();
			$table->string('icon')->nullable();  // icon key or image path for UI
			$table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allergies');
    }
};
