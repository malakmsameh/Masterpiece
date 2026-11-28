<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('recipes', 'admin_id')) {
            Schema::table('recipes', function (Blueprint $table) {
                $table->foreignId('admin_id')->nullable()->after('category_id')
                    ->constrained('admins')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('recipes', 'admin_id')) {
            Schema::table('recipes', function (Blueprint $table) {
                $table->dropForeign(['admin_id']);
                $table->dropColumn('admin_id');
            });
        }
    }
};
