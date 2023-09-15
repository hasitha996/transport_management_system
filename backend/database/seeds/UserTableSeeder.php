<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // user data
        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@admin.com',
            'status' => '1',
            'user_role' => 'Admin',
            'password' => bcrypt('admin'),
        ]);

        $user1 = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@test.com',
            'status' => '1',
            'user_role' => 'user',
            'password' => bcrypt('password'),
        ]);

        $user2 = User::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@test.com',
            'status' => '1',
            'user_role' => 'admin',
            'password' => bcrypt('password'),
        ]);
    }
}
