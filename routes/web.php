<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DetailItemController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/calc', function () {
    return Inertia::render('MainCalc');
})->middleware(['auth', 'verified'])->name('calc');

Route::get('/allitems', [DetailItemController::class, 'getAllItems']);
Route::post('/additem', [DetailItemController::class, 'saveItem']);
Route::post('/removeitem', [DetailItemController::class, 'removeItem']);
Route::put('/updateitem/{id}', [DetailItemController::class, 'updateItem']);

Route::get('/admin/index', function () {
    return Inertia::render('AdminManager');
})->middleware(['auth', 'verified'])->name('adminIndex');

Route::get('/users', [AdminController::class, 'getAllUsers']);
require __DIR__.'/auth.php';
