<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Allergy;
use App\Models\Category;
use App\Models\DietaryPreference;
use App\Models\Ingredient;
use App\Models\MealType;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;

class ReferenceDataController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'categories' => Category::query()->orderBy('name')->get(['id', 'name', 'name_ar']),
            'ingredients' => Ingredient::query()->orderBy('name')->get(['id', 'name', 'name_ar', 'default_unit']),
            'tags' => Tag::query()->where('is_active', true)->orderBy('name')
                ->get(['id', 'name', 'name_ar', 'slug', 'color']),
            'allergies' => Allergy::query()->where('is_active', true)->orderBy('name')
                ->get(['id', 'name', 'name_ar', 'slug', 'description', 'description_ar', 'icon']),
            'dietary_preferences' => DietaryPreference::query()->where('is_active', true)->orderBy('name')
                ->get(['id', 'name', 'name_ar', 'slug', 'description', 'description_ar', 'icon']),
            'meal_types' => MealType::query()->where('is_active', true)->orderBy('sort_order')->orderBy('name')
                ->get(['id', 'name', 'name_ar', 'slug', 'sort_order']),
        ]);
    }
}
