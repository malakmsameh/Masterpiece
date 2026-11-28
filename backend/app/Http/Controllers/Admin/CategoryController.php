<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * GET /api/admin/categories
     * Optional query: ?search=...&page=2
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'search'   => 'nullable|string|max:255',
        ]);

        $query = Category::withCount('recipes');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('name_ar', 'like', '%' . $request->search . '%');
            });
        }

        $categories = $query->latest()->paginate(10);

        return response()->json($categories);
    }

    /**
     * POST /api/admin/categories
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());

        return response()->json([
            'message'  => 'Category created successfully',
            'category' => $category,
        ], 201);
    }

    /**
     * GET /api/admin/categories/{category}
     */
    public function show(Category $category): JsonResponse
    {
        $category->loadCount('recipes');

        return response()->json(['category' => $category]);
    }

    /**
     * PUT /api/admin/categories/{category}
     */
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());

        return response()->json([
            'message'  => 'Category updated successfully',
            'category' => $category->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/categories/{category}
     */
    public function destroy(Category $category): JsonResponse
    {
        if ($category->recipes()->exists()) {
            return response()->json([
                'message' => 'Cannot delete this category because it has recipes.',
            ], 409);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
