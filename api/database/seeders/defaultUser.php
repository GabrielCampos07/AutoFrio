<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultUser extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);
        
        User::create([
            'name' => 'staff',
            'email' => 'staff@staff.com',
            'password' => bcrypt('123'),
            'role' => 'staff',
        ]);
    }
}
