<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RecipeAlternative extends Model
{
    protected $fillable = ['original_recipe_id', 'alternative_recipe_id', 'reason', 'reason_ar', 'calorie_difference'];

    protected function casts(): array
    {
        return ['calorie_difference' => 'integer'];
    }

    public function originalRecipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'original_recipe_id');
    }

    public function alternativeRecipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'alternative_recipe_id');
    }
}
