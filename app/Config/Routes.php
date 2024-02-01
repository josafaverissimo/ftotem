<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', [\App\Controllers\Dashboard::class, 'index'], ['as' => 'dashboard']);

$routes->group('users', static function($routes) {
    $routes->get('/', [\App\Controllers\UsersController::class, 'index'], ['as' => 'users']);
    $routes->get('get', [\App\Controllers\UsersController::class, 'get'], ['as' => 'users.get']);
    $routes->post('save', [\App\Controllers\UsersController::class, 'save'], ['as' => 'users.save']);
    $routes->delete('/', [\App\Controllers\UsersController::class, 'delete'], ['as' => 'users.delete']);
});

$routes->group('clients', static function($routes) {
    $routes->get('/', [\App\Controllers\ClientsController::class, 'index'], ['as' => 'clients']);
    $routes->get('get', [\App\Controllers\ClientsController::class, 'get'], ['as' => 'clients.get']);
    $routes->post('save', [\App\Controllers\ClientsController::class, 'save'], ['as' => 'clients.save']);
    $routes->delete('/', [\App\Controllers\ClientsController::class, 'delete'], ['as' => 'clients.delete']);
});

$routes->group('events', static function($routes) {
    $routes->get('/', [\App\Controllers\EventsController::class, 'index'], ['as' => 'events']);
    $routes->get('get', [\App\Controllers\EventsController::class, 'get'], ['as' => 'events.get']);
    $routes->post('save', [\App\Controllers\EventsController::class, 'save'], ['as' => 'events.save']);
    $routes->delete('/', [\App\Controllers\EventsController::class, 'delete'], ['as' => 'events.delete']);

    $routes->group('categories', static function($routes) {
        $routes->get('/', [\App\Controllers\EventsCategoriesController::class, 'index'], ['as' => 'events.categories']);
        $routes->get('get', [\App\Controllers\EventsCategoriesController::class, 'get'], ['as' => 'events.categories.get']);
        $routes->post('save', [\App\Controllers\EventsCategoriesController::class, 'save'], ['as' => 'events.categories.save']);
        $routes->delete('/', [\App\Controllers\EventsCategoriesController::class, 'delete'], ['as' => 'events.categories.delete']);
    });
});
