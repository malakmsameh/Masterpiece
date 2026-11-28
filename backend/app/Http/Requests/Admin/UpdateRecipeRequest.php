<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRecipeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'title_ar' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string', 'max:15000'],
            'description_ar' => ['sometimes', 'required', 'string', 'max:15000'],
            'instructions' => ['sometimes', 'required', 'string', 'max:15000'],
            'instructions_ar' => ['sometimes', 'required', 'string', 'max:15000'],
            'image' => ['sometimes', 'nullable', 'string', 'max:255'],
            'preparation_time' => ['sometimes', 'required', 'integer', 'min:0'],
            'cooking_time' => ['sometimes', 'required', 'integer', 'min:0'],
            'servings' => ['sometimes', 'required', 'integer', 'min:1'],
            'calories_per_serving' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'protein_per_serving' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'carbs_per_serving' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'fat_per_serving' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'fiber_per_serving' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'difficulty' => ['sometimes', 'required', 'in:easy,medium,hard'],
            'source_type' => ['sometimes', 'required', 'in:admin,ai'],
            'status' => ['sometimes', 'required', 'in:draft,published'],
            'ingredients' => ['sometimes', 'required', 'array', 'min:1'],
            'ingredients.*.ingredient_id' => ['required_with:ingredients', 'integer', 'distinct', 'exists:ingredients,id'],
            'ingredients.*.quantity' => ['required_with:ingredients', 'numeric', 'gt:0', 'max:99999999.99'],
            'ingredients.*.unit' => ['required_with:ingredients', 'string', 'max:255'],
            'ingredients.*.notes' => ['nullable', 'string', 'max:5000'],
            'ingredients.*.notes_ar' => ['nullable', 'string', 'max:5000'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => ['required_with:tag_ids', 'integer', 'distinct', 'exists:tags,id'],
            'meal_type_ids' => ['sometimes', 'array'],
            'meal_type_ids.*' => ['required_with:meal_type_ids', 'integer', 'distinct', 'exists:meal_types,id'],
            'dietary_preference_ids' => ['sometimes', 'array'],
            'dietary_preference_ids.*' => ['required_with:dietary_preference_ids', 'integer', 'distinct', 'exists:dietary_preferences,id'],
        ];
    }
}
