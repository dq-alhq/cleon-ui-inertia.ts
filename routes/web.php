<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::get('about', Controllers\AboutController::class)->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', Controllers\UserController::class);
        Route::put('users/roles/{user}/{role}', [Controllers\UserController::class, 'updateRoles'])->name('users.roles');
        Route::resource('roles', Controllers\RoleController::class);
        Route::put('roles/permissions/{role}', [Controllers\RoleController::class, 'updatePermissions'])->name('roles.permissions');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('profile', [Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});


if (! app()->isProduction()) {
    Route::get('dev/login/{id}', function ($id = null) {
        auth()->loginUsingId($id);
        return redirect('/');
    });
}

require __DIR__ . '/auth.php';
