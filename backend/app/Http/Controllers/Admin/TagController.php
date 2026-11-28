<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255'], 'is_active' => ['nullable', 'boolean']]);
        $query = Tag::query()->withCount('recipes');
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

    public function store(StoreTagRequest $request): JsonResponse
    {
        return response()->json(['message' => 'Tag created successfully.', 'tag' => Tag::create($request->validated())], 201);
    }

    public function show(Tag $tag): JsonResponse
    {
        return response()->json(['tag' => $tag->loadCount('recipes')]);
    }

    public function update(UpdateTagRequest $request, Tag $tag): JsonResponse
    {
        $tag->update($request->validated());

        return response()->json(['message' => 'Tag updated successfully.', 'tag' => $tag->fresh()]);
    }

    public function destroy(Tag $tag): JsonResponse
    {
        if ($tag->recipes()->exists()) {
            return response()->json(['message' => 'Cannot delete a tag that is assigned to recipes.'], 409);
        }

        $tag->delete();

        return response()->json(['message' => 'Tag deleted successfully.']);
    }
}
