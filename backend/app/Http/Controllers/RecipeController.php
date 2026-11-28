<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function categories(): JsonResponse
    {
        return response()->json(Category::query()->orderBy('name')->paginate(10)->withQueryString());
    }

    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'difficulty' => ['nullable', 'in:easy,medium,hard'],
            'min_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'max_calories' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'tag_id' => ['nullable', 'integer', 'exists:tags,id'],
            'meal_type_id' => ['nullable', 'integer', 'exists:meal_types,id'],
            'dietary_preference_id' => ['nullable', 'integer', 'exists:dietary_preferences,id'],
        ]);

        $query = Recipe::query()
            ->where('status', 'published')
            ->with(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences']);

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($builder) => $builder
                ->where('title', 'like', "%{$search}%")
                ->orWhere('title_ar', 'like', "%{$search}%"));
        }

        foreach (['category_id', 'difficulty'] as $filter) {
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

        if (isset($filters['tag_id'])) {
            $query->whereHas('tags', fn ($tags) => $tags->whereKey($filters['tag_id']));
        }

        if (isset($filters['meal_type_id'])) {
            $query->whereHas('mealTypes', fn ($mealTypes) => $mealTypes->whereKey($filters['meal_type_id']));
        }

        if (isset($filters['dietary_preference_id'])) {
            $query->whereHas('dietaryPreferences', fn ($preferences) => $preferences->whereKey($filters['dietary_preference_id']));
        }

        return response()->json($query->orderByDesc('id')->paginate(10)->withQueryString());
    }

    public function show(Recipe $recipe): JsonResponse
    {
        abort_unless($recipe->status === 'published', 404);

        return response()->json([
            'recipe' => $recipe->load(['category', 'ingredients.ingredient', 'tags', 'mealTypes', 'dietaryPreferences']),
        ]);
    }
}
