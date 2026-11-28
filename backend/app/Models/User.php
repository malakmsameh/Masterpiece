<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
		'phone',
		'date_of_birth',
		'gender',
		'status',
		'profile_photo',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

	public function profile()
	{
		return $this->hasOne(UserProfile::class);
	}
	public function savedRecipes()
	{
		return $this->hasMany(UserSavedRecipe::class);
	}
	public function ratings()
	{
		return $this->hasMany(RecipeRating::class);
	}

	public function allergies(): BelongsToMany
	{
		return $this->belongsToMany(Allergy::class, 'user_allergies')
			->withPivot(['severity', 'notes', 'notes_ar'])->withTimestamps();
	}

	public function dietaryPreferences(): BelongsToMany
	{
		return $this->belongsToMany(DietaryPreference::class, 'user_dietary_preferences')->withTimestamps();
	}

}
