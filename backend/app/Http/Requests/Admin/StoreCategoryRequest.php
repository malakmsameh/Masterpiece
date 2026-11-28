<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return false;
		return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
			'name'           => ['required', 'string', 'max:255', 'unique:categories,name'],
            'name_ar'        => ['required', 'string', 'max:255'],
            'description'    => ['required', 'string', 'max:5000'],
            'description_ar' => ['required', 'string', 'max:5000'],
            'image'          => ['nullable', 'string', 'max:255'],
        ];
    }
	public function messages(): array
    {
        return [
            'name.unique' => 'A category with this name already exists.',
        ];
    }
}
