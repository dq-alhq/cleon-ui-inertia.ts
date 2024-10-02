<?php

if (! function_exists('Toast')) {
    function Toast($type, $message, $description = null): void
    {
        session()->flash('type', $type);
        session()->flash('message', $message);
        session()->flash('description', $description);
    }
}
if (! function_exists('generatePermissions')) {
    function generatePermissions(): array
    {
        $models = [];
        $path = app_path('Models');
        $permissions = ['c', 'r', 'u', 'd',];
        foreach (glob($path . '/*.php') as $file) {
            $model = strtolower(basename($file, '.php'));
            foreach ($permissions as $permission) {
                $models[] = "{$permission} {$model}";
            }
        }
        return $models;
    }
}
if (! function_exists('getAllModels')) {
    function getAllModels(): array
    {
        $models = [];
        $path = app_path('Models');
        foreach (glob($path . '/*.php') as $file) {
            $model = strtolower(basename($file, '.php'));
            $models[] = $model;
        }
        return $models;
    }
}
