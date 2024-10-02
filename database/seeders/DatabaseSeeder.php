<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Artisan::call('generate-permissions');
        $roles = ['admin', 'moderator'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        Role::findByName('admin')->givePermissionTo(Permission::all());
        Role::findByName('moderator')->givePermissionTo(Permission::where('name', 'user-read')->first());

        User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@example.com',
        ])->assignRole('admin');

        User::factory()->create([
            'name' => 'Moderator',
            'username' => 'moderator',
            'email' => 'moderator@example.com',
        ])->assignRole('moderator');


        User::factory(150)->create();
    }
}
