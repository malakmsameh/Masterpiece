<?php

namespace Database\Seeders;

use App\Models\Admin;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
		// Primary demo account — fixed credentials for easy login
        Admin::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name'      => 'admin',
                'password'  => '123456789', // hashed automatically by the Admin cast
                'is_active' => true,
            ]
        );

        // Secondary account — useful later for "manage admins" screen demos
        Admin::updateOrCreate(
            ['email' => 'manager@gmail.com'],
            [
                'name'      => 'Manager',
                'password'  => '123456789',
                'is_active' => true,
            ]
        );
    }
}
