<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class GeneratePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate-permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate CRUD permissions for all models.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $permissions = ['create', 'read', 'update', 'delete',];
        foreach (glob(app_path('Models') . '/*.php') as $file) {
            $model = strtolower(basename($file, '.php'));
            foreach ($permissions as $permission) {
                Permission::updateOrCreate(['name' => "{$model}-{$permission}"]);
            }
        }
    }
}
