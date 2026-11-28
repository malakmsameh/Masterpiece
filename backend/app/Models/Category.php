<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
	protected $fillable = [
		'name',
		'name_ar',
		'description',
		'description_ar',
		'image',
	];

	public function recipes()
	{
		return $this->hasMany(Recipe::class);
	}


}
