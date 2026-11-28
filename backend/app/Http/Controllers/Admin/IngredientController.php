<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreIngredientRequest;
use App\Http\Requests\Admin\UpdateIngredientRequest;
use App\Models\Ingredient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'min_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'max_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
        ]);

        $query = Ingredient::query()->withCount('recipeIngredients');

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($builder) => $builder
                ->where('name', 'like', "%{$search}%")
                ->orWhere('name_ar', 'like', "%{$search}%"));
        }

        if (array_key_exists('min_calories', $filters) && $filters['min_calories'] !== null) {
            $query->where('calories_per_100g', '>=', $filters['min_calories']);
        }

        if (array_key_exists('max_calories', $filters) && $filters['max_calories'] !== null) {
            $query->where('calories_per_100g', '<=', $filters['max_calories']);
        }

        return response()->json($query->orderByDesc('id')->paginate(10)->withQueryString());
    }

    public function store(StoreIngredientRequest $request): JsonResponse
    {
        $ingredient = Ingredient::create($request->validated());

        return response()->json([
            'message' => 'Ingredient created successfully.',
            'ingredient' => $ingredient,
        ], 201);
    }

    public function show(Ingredient $ingredient): JsonResponse
    {
        return response()->json(['ingredient' => $ingredient->loadCount('recipeIngredients')]);
    }

    public function update(UpdateIngredientRequest $request, Ingredient $ingredient): JsonResponse
    {
        $ingredient->update($request->validated());

        return response()->json([
            'message' => 'Ingredient updated successfully.',
            'ingredient' => $ingredient->fresh()->loadCount('recipeIngredients'),
        ]);
    }

    public function destroy(Ingredient $ingredient): JsonResponse
    {
        if ($ingredient->recipeIngredients()->exists()
            || $ingredient->substitutions()->exists()
            || $ingredient->substitutedFor()->exists()) {
            return response()->json([
                'message' => 'Cannot delete this ingredient while it is used by a recipe or substitution.',
            ], 409);
        }

        $ingredient->delete();

        return response()->json(['message' => 'Ingredient deleted successfully.']);
    }
}
