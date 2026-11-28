<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
		'name',
		'name_ar',
		'slug',
		'color',
		'is_active'
		];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function recipes(): BelongsToMany
    {
        return $this->belongsToMany(Recipe::class)->withTimestamps();
    }
}
