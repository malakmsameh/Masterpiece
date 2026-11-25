<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    /** @use HasFactory<\Database\Factories\UserProfileFactory> */
    use HasFactory;

	protected $fillable = [
		// user_id	BIGINT FK	References users
			'height_cm',
			'current_weight',
			'target_weight',
			'activity_level',
			'fitness_goal',
			'daily_calorie_target',
			'daily_water_target',
	];
	protected function casts(): array
	{
		return [
			'height_cm' => 'float',
			'current_weight' => 'float',
			'target_weight' => 'float',
			'daily_calorie_target' => 'integer',
			'daily_water_target' => 'integer',
		];
	}
}
