<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Role $role = null)
    {
        return inertia('users/roles/index', [
            'roles' => fn() => RoleResource::collection(Role::query()->paginate(10)),
            'models' => fn() => getAllModels(),

            'role' => $role ?? new Role(),
            'form' => [
                'title' => $role ? 'Edit Role' : 'Create New Role',
                'method' => $role ? 'PUT' : 'POST',
                'url' => $role ? route('roles.update', $role) : route('roles.store'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return $this->index($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
        ]);

        Role::create($request->all());
        Toast('success', 'Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Role $role)
    {
        return $this->index($request, $role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $role->id],
        ]);

        $role->update($validated);
        Toast('success', 'Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        Toast('success', 'Role deleted successfully');
    }

    public function updatePermissions(Request $request, Role $role)
    {
        if ($role->hasPermissionTo($request->permission)) {
            $role->revokePermissionTo($request->permission);
        } else {
            $role->givePermissionTo($request->permission);
        }
        Toast('success', 'Permission updated successfully');
        return back();
    }
}
