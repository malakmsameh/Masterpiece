<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreRecipeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'title_ar' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:15000'],
            'description_ar' => ['required', 'string', 'max:15000'],
            'instructions' => ['required', 'string', 'max:15000'],
            'instructions_ar' => ['required', 'string', 'max:15000'],
            'image' => ['nullable', 'string', 'max:255'],
            'preparation_time' => ['required', 'integer', 'min:0'],
            'cooking_time' => ['required', 'integer', 'min:0'],
            'servings' => ['required', 'integer', 'min:1'],
            'calories_per_serving' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'protein_per_serving' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'carbs_per_serving' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'fat_per_serving' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'fiber_per_serving' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'difficulty' => ['sometimes', 'required', 'in:easy,medium,hard'],
            'source_type' => ['sometimes', 'required', 'in:admin,ai'],
            'status' => ['sometimes', 'required', 'in:draft,published'],
            'ingredients' => ['required', 'array', 'min:1'],
            'ingredients.*.ingredient_id' => ['required', 'integer', 'distinct', 'exists:ingredients,id'],
            'ingredients.*.quantity' => ['required', 'numeric', 'gt:0', 'max:99999999.99'],
            'ingredients.*.unit' => ['required', 'string', 'max:255'],
            'ingredients.*.notes' => ['nullable', 'string', 'max:5000'],
            'ingredients.*.notes_ar' => ['nullable', 'string', 'max:5000'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => ['required', 'integer', 'distinct', 'exists:tags,id'],
            'meal_type_ids' => ['sometimes', 'array'],
            'meal_type_ids.*' => ['required', 'integer', 'distinct', 'exists:meal_types,id'],
            'dietary_preference_ids' => ['sometimes', 'array'],
            'dietary_preference_ids.*' => ['required', 'integer', 'distinct', 'exists:dietary_preferences,id'],
        ];
    }
}
