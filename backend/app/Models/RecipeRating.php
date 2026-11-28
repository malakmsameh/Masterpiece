<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeRating extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeRatingFactory> */
    use HasFactory;

	protected $fillable = [
		'user_id',
		'recipe_id',
		'rating',
		'review',
		'review_ar',
	];

		protected function casts(): array
	{
		return [
			'rating' => 'integer',
		];
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
	public function recipe()
	{
		return $this->belongsTo(Recipe::class);
	}

}
