<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
	    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;

	protected $table = 'recipe_ingredients';

	public $incrementing = true;
		protected $fillable = [
		'recipe_id',
		'ingredient_id',
		'quantity',
		'unit',
		'notes',
		'notes_ar',
		];


	protected function casts(): array
	{
		return [
			'quantity' => 'float',
		];
	}
	public function recipe()
	{
		return $this->belongsTo(Recipe::class);
	}
	public function ingredient()
	{
		return $this->belongsTo(Ingredient::class);
	}
}
