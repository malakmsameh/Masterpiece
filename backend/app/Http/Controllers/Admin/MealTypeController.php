<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMealTypeRequest;
use App\Http\Requests\Admin\UpdateMealTypeRequest;
use App\Models\MealType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MealTypeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255'], 'is_active' => ['nullable', 'boolean']]);
        $query = MealType::query()->withCount('recipes');
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('name_ar', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%"));
        }
        if (array_key_exists('is_active', $filters) && $filters['is_active'] !== null) {
            $query->where('is_active', $filters['is_active']);
        }

        return response()->json($query->orderBy('sort_order')->orderBy('name')->paginate(10)->withQueryString());
    }

    public function store(StoreMealTypeRequest $request): JsonResponse
    {
        return response()->json([
            'message' => 'Meal type created successfully.',
            'meal_type' => MealType::create($request->validated()),
        ], 201);
    }

    public function show(MealType $mealType): JsonResponse
    {
        return response()->json(['meal_type' => $mealType->loadCount('recipes')]);
    }

    public function update(UpdateMealTypeRequest $request, MealType $mealType): JsonResponse
    {
        $mealType->update($request->validated());

        return response()->json(['message' => 'Meal type updated successfully.', 'meal_type' => $mealType->fresh()]);
    }

    public function destroy(MealType $mealType): JsonResponse
    {
        if ($mealType->recipes()->exists()) {
            return response()->json(['message' => 'Cannot delete a meal type assigned to recipes.'], 409);
        }

        $mealType->delete();

        return response()->json(['message' => 'Meal type deleted successfully.']);
    }
}
