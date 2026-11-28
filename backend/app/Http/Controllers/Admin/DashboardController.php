<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'stats' => [
                'categories_count' => Category::count(),
                'ingredients_count' => Ingredient::count(),
                'recipes_count' => Recipe::count(),
                'published_recipes_count' => Recipe::where('status', 'published')->count(),
                'draft_recipes_count' => Recipe::where('status', 'draft')->count(),
                'users_count' => User::count(),
            ],
            'recent_recipes' => Recipe::with('category')
                ->latest()
                ->paginate(10, ['*'], 'recent_page')
                ->withQueryString(),
        ]);
    }
}
