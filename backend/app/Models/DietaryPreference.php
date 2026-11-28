<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DietaryPreference extends Model
{
    protected $fillable = ['name', 'name_ar', 'slug', 'description', 'description_ar', 'icon', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_dietary_preferences')->withTimestamps();
    }

    public function recipes(): BelongsToMany
    {
        return $this->belongsToMany(Recipe::class, 'recipe_dietary_preference')->withTimestamps();
    }
}
