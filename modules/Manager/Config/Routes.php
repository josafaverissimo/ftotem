<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', [\Modules\Manager\Controllers\Dashboard::class, 'index'], ['as' => 'dashboard']);

$routes->group('login', static function($routes) {
    $routes->get('/', [\Modules\Manager\Controllers\Login::class, 'index'], ['as' => 'login']);
    $routes->get('doLogout', [\Modules\Manager\Controllers\Login::class, 'doLogout'], ['as' => 'login.doLogout']);
    $routes->post('doLogin', [\Modules\Manager\Controllers\Login::class, 'doLogin'], ['as' => 'login.doLogin']);
});

$routes->group('users', static function($routes) {
    $routes->get('/', [\Modules\Manager\Controllers\UsersController::class, 'index'], ['as' => 'users']);
    $routes->get('get', [\Modules\Manager\Controllers\UsersController::class, 'get'], ['as' => 'users.get']);
    $routes->post('save', [\Modules\Manager\Controllers\UsersController::class, 'save'], ['as' => 'users.save']);
    $routes->delete('/', [\Modules\Manager\Controllers\UsersController::class, 'delete'], ['as' => 'users.delete']);
});

$routes->group('clients', static function($routes) {
    $routes->get('/', [\Modules\Manager\Controllers\ClientsController::class, 'index'], ['as' => 'clients']);
    $routes->get('get', [\Modules\Manager\Controllers\ClientsController::class, 'get'], ['as' => 'clients.get']);
    $routes->get('getAll', [\Modules\Manager\Controllers\ClientsController::class, 'getAll'], ['as' => 'clients.getAll']);
    $routes->post('save', [\Modules\Manager\Controllers\ClientsController::class, 'save'], ['as' => 'clients.save']);
    $routes->delete('/', [\Modules\Manager\Controllers\ClientsController::class, 'delete'], ['as' => 'clients.delete']);
});

$routes->group('events', static function($routes) {
    $routes->get('/', [\Modules\Manager\Controllers\EventsController::class, 'index'], ['as' => 'events']);
    $routes->get('get', [\Modules\Manager\Controllers\EventsController::class, 'get'], ['as' => 'events.get']);
    $routes->get('getAll', [\Modules\Manager\Controllers\EventsController::class, 'getAll'], ['as' => 'events.getAll']);
    $routes->post('save', [\Modules\Manager\Controllers\EventsController::class, 'save'], ['as' => 'events.save']);
    $routes->delete('/', [\Modules\Manager\Controllers\EventsController::class, 'delete'], ['as' => 'events.delete']);

    $routes->group('categories', static function($routes) {
        $routes->get('/', [\Modules\Manager\Controllers\EventsCategoriesController::class, 'index'], ['as' => 'events.categories']);
        $routes->get('get', [\Modules\Manager\Controllers\EventsCategoriesController::class, 'get'], ['as' => 'events.categories.get']);
        $routes->get('getAll', [\Modules\Manager\Controllers\EventsCategoriesController::class, 'getAll'], ['as' => 'events.categories.getAll']);
        $routes->post('save', [\Modules\Manager\Controllers\EventsCategoriesController::class, 'save'], ['as' => 'events.categories.save']);
        $routes->delete('/', [\Modules\Manager\Controllers\EventsCategoriesController::class, 'delete'], ['as' => 'events.categories.delete']);
    });

    $routes->group('videos', static function($routes) {
        $routes->get('/', [\Modules\Manager\Controllers\EventsVideos::class, 'index'], ['as' => 'events.videos']);
        $routes->delete('delete/(:num)',
            [\Modules\Manager\Controllers\EventsVideos::class, 'delete'],
            ['as' => 'events.videos.delete']
        );
        $routes->get('getVideosDataByEventId/(:num)',
            [\Modules\Manager\Controllers\EventsVideos::class, 'getVideosDataByEventId'],
            ['as' => 'events.videos.getVideosDataByEventId']
        );
    });
});
