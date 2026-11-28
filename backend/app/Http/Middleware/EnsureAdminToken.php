<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $admin = $request->user();

        if (! $admin instanceof Admin || ! $admin->is_active) {
            return response()->json(['message' => 'An active admin account is required.'], 403);
        }

        return $next($request);
    }
}
