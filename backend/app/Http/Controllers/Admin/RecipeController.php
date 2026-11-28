<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRecipeRequest;
use App\Http\Requests\Admin\UpdateRecipeRequest;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'status' => ['nullable', 'in:draft,published'],
            'source_type' => ['nullable', 'in:admin,ai'],
            'difficulty' => ['nullable', 'in:easy,medium,hard'],
            'min_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'max_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'meal_type_id' => ['nullable', 'integer', 'exists:meal_types,id'],
            'dietary_preference_id' => ['nullable', 'integer', 'exists:dietary_preferences,id'],
        ]);

        $query = Recipe::query()
            ->with(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences'])
            ->withCount('ingredients');

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($builder) => $builder
                ->where('title', 'like', "%{$search}%")
                ->orWhere('title_ar', 'like', "%{$search}%"));
        }

        foreach (['category_id', 'status', 'difficulty', 'source_type'] as $filter) {
            if (isset($filters[$filter])) {
                $query->where($filter, $filters[$filter]);
            }
        }

        if (isset($filters['min_calories'])) {
            $query->where('calories_per_serving', '>=', $filters['min_calories']);
        }

        if (isset($filters['max_calories'])) {
            $query->where('calories_per_serving', '<=', $filters['max_calories']);
        }

        foreach ([
            'tag_id' => 'tags',
            'meal_type_id' => 'mealTypes',
            'dietary_preference_id' => 'dietaryPreferences',
        ] as $filter => $relation) {
            if (isset($filters[$filter])) {
                $query->whereHas($relation, fn ($related) => $related->whereKey($filters[$filter]));
            }
        }

        return response()->json($query->orderByDesc('id')->paginate(10)->withQueryString());
    }

    public function store(StoreRecipeRequest $request): JsonResponse
    {
        $data = $request->validated();
        $ingredients = $data['ingredients'];
        $tagIds = $data['tag_ids'] ?? [];
        $mealTypeIds = $data['meal_type_ids'] ?? [];
        $dietaryPreferenceIds = $data['dietary_preference_ids'] ?? [];
        unset($data['ingredients'], $data['tag_ids'], $data['meal_type_ids'], $data['dietary_preference_ids']);

        $recipe = DB::transaction(function () use ($data, $ingredients, $tagIds, $mealTypeIds, $dietaryPreferenceIds, $request): Recipe {
            $recipe = Recipe::create([
                ...$data,
                'admin_id' => $request->user()->id,
            ]);

            $recipe->ingredients()->createMany($ingredients);
            $recipe->tags()->sync($tagIds);
            $recipe->mealTypes()->sync($mealTypeIds);
            $recipe->dietaryPreferences()->sync($dietaryPreferenceIds);

            return $recipe->load(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences']);
        });

        return response()->json([
            'message' => 'Recipe created successfully.',
            'recipe' => $recipe,
        ], 201);
    }

    public function show(Recipe $recipe): JsonResponse
    {
        return response()->json([
            'recipe' => $recipe->load(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences']),
        ]);
    }

    public function update(UpdateRecipeRequest $request, Recipe $recipe): JsonResponse
    {
        $data = $request->validated();
        $ingredients = $data['ingredients'] ?? null;
        $tagIds = $data['tag_ids'] ?? null;
        $mealTypeIds = $data['meal_type_ids'] ?? null;
        $dietaryPreferenceIds = $data['dietary_preference_ids'] ?? null;
        unset($data['ingredients'], $data['tag_ids'], $data['meal_type_ids'], $data['dietary_preference_ids']);

        $recipe = DB::transaction(function () use ($data, $ingredients, $tagIds, $mealTypeIds, $dietaryPreferenceIds, $recipe): Recipe {
            $recipe->update($data);

            if ($ingredients !== null) {
                $recipe->ingredients()->delete();
                $recipe->ingredients()->createMany($ingredients);
            }

            if ($tagIds !== null) {
                $recipe->tags()->sync($tagIds);
            }

            if ($mealTypeIds !== null) {
                $recipe->mealTypes()->sync($mealTypeIds);
            }

            if ($dietaryPreferenceIds !== null) {
                $recipe->dietaryPreferences()->sync($dietaryPreferenceIds);
            }

            return $recipe->fresh()->load(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences']);
        });

        return response()->json([
            'message' => 'Recipe updated successfully.',
            'recipe' => $recipe,
        ]);
    }

    public function destroy(Recipe $recipe): JsonResponse
    {
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully.']);
    }
}
