<?php

use CodeIgniter\Router\RouteCollection;

/**
* @var RouteCollection $routes
*/

$routes->group('totem-api', static function($routes) {
    $routes->get('/', [\Modules\Totem\Controllers\App::class, 'index']);

    $routes->group('auth', static function($routes) {
        $routes->post('doLogin', [\Modules\Totem\Controllers\AuthController::class, 'doLogin'], ['as' => 'totem-app.auth.doLogin']);
        $routes->get('validateToken', [\Modules\Totem\Controllers\AuthController::class, 'validateToken'], ['as' => 'totem-app.auth.validateToken']);
    });

    $routes->group('events', static function($routes) {
        $routes->get('get', [\Modules\Totem\Controllers\EventsController::class, 'get'], ['as' => 'totem-app.events.get']);
    });
});