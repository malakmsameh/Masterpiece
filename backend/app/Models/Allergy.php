<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Allergy extends Model
{
    protected $fillable = [
		'name',
		'name_ar',
		'slug',
		'description',
		'description_ar',
		'icon',
		'is_active'
		];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_allergies')
            ->withPivot(['severity', 'notes', 'notes_ar'])->withTimestamps();
    }
}
