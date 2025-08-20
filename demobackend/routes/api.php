<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController as ApiUserController;
use App\Http\Controllers\Api\CategoryController as ApiCategoryController;
use App\Http\Controllers\Api\ProductController as ApiProductController;
use App\Http\Controllers\Api\CartController as ApiCartController;
use App\Http\Controllers\Api\OrderController as ApiOrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('v1')->group(function () {
    Route::get('/login', [ApiUserController::class, 'index'])->name('users.index');
    Route::post('/users', [ApiUserController::class, 'store'])->name('users.store');
    Route::post('/login', [ApiUserController::class, 'login'])->name('users.login');

    // Authentication routes
    Route::middleware('auth:sanctum')->group(function(){
        // User profile routes
        Route::post('/logout', [ApiUserController::class, 'logout'])->name('users.logout');
        Route::get('/users', [ApiUserController::class, 'show'])->name('users.show');
        Route::put('/users', [ApiUserController::class, 'update'])->name('users.update');

        // Cart routes
        Route::get('/cart', [ApiCartController::class, 'show'])->name('cart.show');
        Route::post('/cart/create', [ApiCartController::class, 'createCart'])->name('cart.create');
        Route::put('/cart/add', [ApiCartController::class, 'addItem'])->name('cart.add');
        Route::put('/cart/remove', [ApiCartController::class, 'removeItem'])->name('cart.remove');
        Route::put('/cart/update', [ApiCartController::class, 'updateItem'])->name('cart.update');

        // Order routes
        Route::get('/orders', [ApiOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{id}', [ApiOrderController::class, 'showOrderDetails'])->name('orders.show');
        Route::post('/orders/create', [ApiOrderController::class, 'createOrderWithCart'])->name('orders.create');
        Route::post('/orders/create-direct', [ApiOrderController::class, 'createOrderDirect'])->name('orders.createDirect');

    });

    //category routes
    Route::get('/categories', [ApiCategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{id}', [ApiCategoryController::class, 'showProductByCateId'])->name('categories.products');

    //product routes
    Route::get('/products', [ApiProductController::class, 'index'])->name('products.index');
    Route::get('/products/search', [ApiProductController::class, 'search'])->name('products.search');
    Route::get('/products/{id}', [ApiProductController::class, 'show'])->name('products.show');
    
});
