<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, User $user = null)
    {
        $perPage = $request->per_page ?? 10;
        $search = $request->q ?? null;
        $users = User::query()
            ->when($search, fn($query) => $query->where('name', 'like', '%' . $search . '%'))
            ->paginate($perPage)
            ->withQueryString();
        $roles = Role::all();
        return inertia('users/index', [
            'users' => fn() => UserResource::collection($users),
            'roles' => fn() => $roles,

            'user' => $user ?? new User(),
            'form' => [
                'title' => $user ? 'Edit User' : 'Create New User',
                'method' => $user ? 'PUT' : 'POST',
                'url' => $user ? route('users.update', $user) : route('users.store'),
            ],

            'page_options' => [
                'per_page' => $perPage,
                'search' => $search,
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        ]);

        User::factory()->create($validated);
        Toast('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, User $user)
    {
        return $this->index($request, $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);
        Toast('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        Toast('success', 'User deleted successfully');
    }

    public function updateRoles(User $user, Role $role)
    {
        if ($user->hasRole($role->name)) {
            $user->removeRole($role->name);
        } else {
            $user->assignRole($role->name);
        }
        Toast('success', 'Role updated successfully');
        return back();
    }
}
