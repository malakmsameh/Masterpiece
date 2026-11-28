<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAllergyRequest;
use App\Http\Requests\Admin\UpdateAllergyRequest;
use App\Models\Allergy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AllergyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate(['search' => ['nullable', 'string', 'max:255'], 'is_active' => ['nullable', 'boolean']]);
        $query = Allergy::query()->withCount('users');
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

    public function store(StoreAllergyRequest $request): JsonResponse
    {
        return response()->json(['message' => 'Allergy created successfully.', 'allergy' => Allergy::create($request->validated())], 201);
    }

    public function show(Allergy $allergy): JsonResponse
    {
        return response()->json(['allergy' => $allergy->loadCount('users')]);
    }

    public function update(UpdateAllergyRequest $request, Allergy $allergy): JsonResponse
    {
        $allergy->update($request->validated());

        return response()->json(['message' => 'Allergy updated successfully.', 'allergy' => $allergy->fresh()]);
    }

    public function destroy(Allergy $allergy): JsonResponse
    {
        if ($allergy->users()->exists()) {
            return response()->json(['message' => 'Cannot delete an allergy selected by users.'], 409);
        }

        $allergy->delete();

        return response()->json(['message' => 'Allergy deleted successfully.']);
    }
}
