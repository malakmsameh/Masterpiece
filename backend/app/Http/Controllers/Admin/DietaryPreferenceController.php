<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDietaryPreferenceRequest;
use App\Http\Requests\Admin\UpdateDietaryPreferenceRequest;
use App\Models\DietaryPreference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DietaryPreferenceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255'], 'is_active' => ['nullable', 'boolean']]);
        $query = DietaryPreference::query()->withCount(['users', 'recipes']);
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('name_ar', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%"));
        }
        if (array_key_exists('is_active', $filters) && $filters['is_active'] !== null) {
            $query->where('is_active', $filters['is_active']);
        }

        return response()->json($query->orderBy('name')->paginate(10)->withQueryString());
    }

    public function store(StoreDietaryPreferenceRequest $request): JsonResponse
    {
        return response()->json([
            'message' => 'Dietary preference created successfully.',
            'dietary_preference' => DietaryPreference::create($request->validated()),
        ], 201);
    }

    public function show(DietaryPreference $dietaryPreference): JsonResponse
    {
        return response()->json(['dietary_preference' => $dietaryPreference->loadCount(['users', 'recipes'])]);
    }

    public function update(UpdateDietaryPreferenceRequest $request, DietaryPreference $dietaryPreference): JsonResponse
    {
        $dietaryPreference->update($request->validated());

        return response()->json([
            'message' => 'Dietary preference updated successfully.',
            'dietary_preference' => $dietaryPreference->fresh(),
        ]);
    }

    public function destroy(DietaryPreference $dietaryPreference): JsonResponse
    {
        if ($dietaryPreference->users()->exists() || $dietaryPreference->recipes()->exists()) {
            return response()->json(['message' => 'Cannot delete a dietary preference assigned to users or recipes.'], 409);
        }

        $dietaryPreference->delete();

        return response()->json(['message' => 'Dietary preference deleted successfully.']);
    }
}
