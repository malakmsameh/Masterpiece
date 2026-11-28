<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIngredientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'name_ar' => ['sometimes', 'required', 'string', 'max:255'],
            'calories_per_100g' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'protein_per_100g' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'carbohydrates_per_100g' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'fat_per_100g' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'fiber_per_100g' => ['sometimes', 'required', 'numeric', 'min:0', 'max:999999.99'],
            'default_unit' => ['sometimes', 'required', 'string', 'max:255'],
        ];
    }
}
