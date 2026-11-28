<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;
	protected $fillable = [
			// 	category_id	BIGINT FK	Recipe category
			'category_id',
			// created_by	BIGINT FK NULL	User who created it, if applicable
			'admin_id',
			'title',
			'title_ar',
			'description',
			'description_ar',
			'instructions',
			'instructions_ar',
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
			'status',

	];
	protected $attributes = [
			'difficulty' => 'medium',
			'source_type' => 'admin',
			'status' => 'draft',
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
		];
	}


	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function admin()
	{
		return $this->belongsTo(Admin::class);
	}
	public function ingredients()
	{
		return $this->hasMany(RecipeIngredient::class);
	}
	public function ratings()
	{
		return $this->hasMany(RecipeRating::class);
	}
	public function savedBy()
	{
		return $this->hasMany(UserSavedRecipe::class);
	}

	public function tags(): BelongsToMany
	{
		return $this->belongsToMany(Tag::class)->withTimestamps();
	}

	public function mealTypes(): BelongsToMany
	{
		return $this->belongsToMany(MealType::class, 'recipe_meal_type')->withTimestamps();
	}

	public function dietaryPreferences(): BelongsToMany
	{
		return $this->belongsToMany(DietaryPreference::class, 'recipe_dietary_preference')->withTimestamps();
	}

	public function alternativeLinks()
	{
		return $this->hasMany(RecipeAlternative::class, 'original_recipe_id');
	}

	public function alternatives(): BelongsToMany
	{
		return $this->belongsToMany(self::class, 'recipe_alternatives', 'original_recipe_id', 'alternative_recipe_id')
			->withPivot(['reason', 'reason_ar', 'calorie_difference'])->withTimestamps();
	}

	public function alternativeTo(): BelongsToMany
	{
		return $this->belongsToMany(self::class, 'recipe_alternatives', 'alternative_recipe_id', 'original_recipe_id')
			->withPivot(['reason', 'reason_ar', 'calorie_difference'])->withTimestamps();
	}

}
