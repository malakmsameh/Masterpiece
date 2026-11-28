<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('status', ['active', 'inactive', 'warned'])->default('active')->after('gender');
            });
        }

        if (Schema::hasColumn('users', 'is_active')) {
            DB::table('users')->where('is_active', false)->update(['status' => 'inactive']);

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_active');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'is_active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_active')->default(true)->after('gender');
            });
        }

        if (Schema::hasColumn('users', 'status')) {
            DB::table('users')->where('status', 'inactive')->update(['is_active' => false]);

            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
    }
};
