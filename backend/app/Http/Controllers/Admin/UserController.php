<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\IndexUserRequest;
use App\Http\Requests\Admin\UpdateUserStatusRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(IndexUserRequest $request): JsonResponse
    {
        $filters = $request->validated();
        $query = User::query();

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($builder) => $builder
                ->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"));
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (array_key_exists('email_verified', $filters) && $filters['email_verified'] !== null) {
            $filters['email_verified']
                ? $query->whereNotNull('email_verified_at')
                : $query->whereNull('email_verified_at');
        }

        $users = $query->orderByDesc('id')->paginate(10)->withQueryString();
        $users->through(fn (User $user) => $this->userPayload($user));

        return response()->json($users);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(['user' => $this->userPayload($user)]);
    }

    public function updateStatus(UpdateUserStatusRequest $request, User $user): JsonResponse
    {
        $user->update($request->validated());

        if ($user->status === 'inactive') {
            // Deactivation immediately revokes any Sanctum API tokens this user has.
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => match ($user->status) {
                'inactive' => 'User deactivated successfully.',
                'warned' => 'User marked as warned successfully.',
                default => 'User activated successfully.',
            },
            'user' => $this->userPayload($user->fresh()),
        ]);
    }

    /** @return array<string, mixed> */
    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'gender' => $user->gender,
            'status' => $user->status,
            'email_verified_at' => $user->email_verified_at,
            'created_at' => $user->created_at,
        ];
    }
}
