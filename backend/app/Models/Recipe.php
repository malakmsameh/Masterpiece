<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;
	protected $fillable = [
			// 	category_id	BIGINT FK	Recipe category
			// created_by	BIGINT FK NULL	User who created it, if applicable
			'title',
			// 'title_ar',
			'description',
			'instructions',
			'image',
			'preparation_time',
			'cooking_time',
			'servings',
			'calories_per_serving',
			'protein_per_serving',
			'carbs_per_serving',
			'fat_per_serving',
			'fiber_per_serving',
			'difficulty',
			'source_type',
			'is_public',

	];
	protected $attributes = [
			'difficulty' => 'medium',
			'source_type' => 'user',
			'is_public' => true,
	];
	protected function casts(): array
	{
		return [
			'preparation_time' => 'integer',
			'cooking_time' => 'integer',
			'servings' => 'integer',
			'calories_per_serving' => 'float',
			'protein_per_serving' => 'float',
			'carbs_per_serving' => 'float',
			'fat_per_serving' => 'float',
			'fiber_per_serving' => 'float',
			'is_public' => 'boolean',
		];
	}
}
