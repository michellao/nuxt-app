<?php

use App\Http\Controllers\DiscordAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/auth-discord', [DiscordAuthController::class, 'auth']);
