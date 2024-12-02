<?php

namespace Database\Seeders;

use App\Models\Agora;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'     => 'Test User',
            'email'    => 'honeylive@gmail.com',
            'password' => Hash::make('16008281'),
            'diamond_password' => '809080'
        ]);

        Agora::create([
            'project_name'    => 'Testing',
            'app_id'          => '889bf6ff5711498face74395d1b83145',
            'app_certificate' => '9ed93865e9a140cd9ef4a1b6863e9835',
        ]);
    }
}
