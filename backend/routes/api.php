<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\RecipeController as PublicRecipeController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\IngredientController;
use App\Http\Controllers\Admin\RecipeController as AdminRecipeController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\AllergyController;
use App\Http\Controllers\Admin\DietaryPreferenceController;
use App\Http\Controllers\Admin\MealTypeController;
use App\Http\Controllers\Api\ReferenceDataController;

Route::get('/lookups', [ReferenceDataController::class, 'index']);
Route::get('/categories', [PublicRecipeController::class, 'categories']);
Route::get('/recipes', [PublicRecipeController::class, 'index']);
Route::get('/recipes/{recipe}', [PublicRecipeController::class, 'show']);

Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');

Route::prefix('admin')->middleware(['auth:sanctum', 'admin.token'])->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::patch('/me', [AdminAuthController::class, 'updateProfile']);
    Route::put('/password', [AdminAuthController::class, 'updatePassword']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
	Route::get('/dashboard', [DashboardController::class, 'index']);
	Route::apiResource('categories', CategoryController::class);
	Route::apiResource('ingredients', IngredientController::class);
	Route::apiResource('recipes', AdminRecipeController::class);
	Route::get('users', [AdminUserController::class, 'index']);
	Route::get('users/{user}', [AdminUserController::class, 'show']);
	Route::patch('users/{user}/status', [AdminUserController::class, 'updateStatus']);
	Route::apiResource('tags', TagController::class);
	Route::apiResource('allergies', AllergyController::class);
	Route::apiResource('dietary-preferences', DietaryPreferenceController::class);
	Route::apiResource('meal-types', MealTypeController::class);
});
