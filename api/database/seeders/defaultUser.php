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
            'nome' => 'admin',
            'email' => 'admin@admin.com',
            'senha' => bcrypt('123'),
            'cargo' => 'admin',
        ]);
        
        User::create([
            'nome' => 'staff',
            'email' => 'staff@staff.com',
            'senha' => bcrypt('123'),
            'cargo' => 'staff',
        ]);
    }
}
