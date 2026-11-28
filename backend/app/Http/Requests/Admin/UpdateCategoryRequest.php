<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
		/** @var \App\Models\Category|null $category */
        $category = $this->route('category');
        return [
            //
			'name' => ['sometimes','required','string','max:255',
                Rule::unique('categories', 'name')->ignore($category?->id),
            ],
            'name_ar'        => ['sometimes', 'required', 'string', 'max:255'],
            'description'    => ['sometimes', 'required', 'string', 'max:5000'],
            'description_ar' => ['sometimes', 'required', 'string', 'max:5000'],
            'image'          => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
	public function messages(): array
    {
        return [
            'name.unique' => 'Another category already uses this name.',
        ];
    }
}
