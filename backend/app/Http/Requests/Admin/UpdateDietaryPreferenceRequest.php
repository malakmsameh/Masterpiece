<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDietaryPreferenceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $preference = $this->route('dietary_preference');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'name_ar' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('dietary_preferences', 'slug')->ignore($preference?->id)],
            'description' => ['sometimes', 'nullable', 'string', 'max:15000'],
            'description_ar' => ['sometimes', 'nullable', 'string', 'max:15000'],
            'icon' => ['sometimes', 'nullable', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
