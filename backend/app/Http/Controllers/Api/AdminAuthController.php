<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAdminPasswordRequest;
use App\Http\Requests\Admin\UpdateAdminProfileRequest;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $admin = Admin::where('email', $credentials['email'])->first();

        if (! $admin || ! $admin->is_active || ! Hash::check($credentials['password'], $admin->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }

        $token = $admin->createToken(
            'admin-dashboard',
            ['admin'],
            now()->addHours(12),
        );

        return response()->json([
            'token_type' => 'Bearer',
            'access_token' => $token->plainTextToken,
            'admin' => $this->adminPayload($admin),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['admin' => $this->adminPayload($request->user())]);
    }

    public function updateProfile(UpdateAdminProfileRequest $request): JsonResponse
    {
        $admin = $request->user();
        $admin->update($request->validated());

        return response()->json(['message' => 'Profile updated successfully.', 'admin' => $this->adminPayload($admin->fresh())]);
    }

    public function updatePassword(UpdateAdminPasswordRequest $request): JsonResponse
    {
        $admin = $request->user();
        if (! Hash::check($request->validated('current_password'), $admin->password)) {
            return response()->json(['message' => 'The current password is incorrect.', 'errors' => ['current_password' => ['The current password is incorrect.']]], 422);
        }

        $admin->update(['password' => $request->validated('password')]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /** @return array{id: int, name: string, email: string, is_active: bool} */
    private function adminPayload(Admin $admin): array
    {
        return [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'is_active' => $admin->is_active,
        ];
    }
}
