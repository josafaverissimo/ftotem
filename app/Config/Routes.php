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
});

$routes->group('clients', static function($routes) {
    $routes->get('/', [\App\Controllers\Clients::class, 'index'], ['as' => 'clients']);
});

$routes->group('events', static function($routes) {
   $routes->get('/', [\App\Controllers\Events::class, 'index'], ['as' => 'events']);
   $routes->get('categories', [\App\Controllers\EventsCategories::class, 'index'], ['as' => 'events.categories']);
});
