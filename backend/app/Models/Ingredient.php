<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
		/** @use HasFactory<\Database\Factories\IngredientFactory> */
	    use HasFactory;
	protected $fillable = [
			'name',
			'name_ar',
			'calories_per_100g',
			'protein_per_100g',
			'carbohydrates_per_100g',
			'fat_per_100g',
			'fiber_per_100g',
			'default_unit',
	];

	protected function casts(): array
	{
		return [
			'calories_per_100g' => 'float',
			'protein_per_100g' => 'float',
			'carbohydrates_per_100g' => 'float',
			'fat_per_100g' => 'float',
			'fiber_per_100g' => 'float',
		];
	}

	public function substitutions()
	{
		return $this->hasMany(IngredientSubstitution::class, 'ingredient_id');
	}
	public function substitutedFor()
	{
		return $this->hasMany(IngredientSubstitution::class, 'substitute_ingredient_id');
	}
	public function recipeIngredients()
	{
		return $this->hasMany(RecipeIngredient::class);
	}


}
