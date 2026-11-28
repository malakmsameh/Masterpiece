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
			// 'name_ar',
			'calories_per_100g',
			'protein_per_100g',
			'carbohydrates_per_100g',
			'fat_per_100g',
			'fiber_per_100g',
			'default_unit',
	];
}
