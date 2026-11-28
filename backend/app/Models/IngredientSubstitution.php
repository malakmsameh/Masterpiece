<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientSubstitution extends Model
{
    /** @use HasFactory<\Database\Factories\IngredientSubstitutionFactory> */
    use HasFactory;

	protected $fillable = [
		'ingredient_id',
		'substitute_ingredient_id',
		'ratio',
		'notes',
		'notes_ar',
	];

		protected function casts(): array
	{
		return [
			'ratio' => 'float',
		];
	}

	public function ingredient()
	{
		return $this->belongsTo(Ingredient::class, 'ingredient_id');
	}
	// public function substitute()
	// {
	// 	return $this->belongsTo(Ingredient::class, 'substitute_ingredient_id');
	// }
	public function substitute()
	{
		return $this->belongsTo(Ingredient::class, 'substitute_ingredient_id');
	}


}
