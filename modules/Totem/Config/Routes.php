<?php

use CodeIgniter\Router\RouteCollection;

/**
* @var RouteCollection $routes
*/

$routes->group('totem-app', static function($routes) {
    $routes->group('auth', static function($routes) {
        $routes->post('doLogin', [\Modules\Totem\Controllers\Auth::class, 'doLogin'], ['as' => 'totem-app.auth.doLogin']);
        $routes->get('validateToken', [\Modules\Totem\Controllers\Auth::class, 'validateToken'], ['as' => 'totem-app.auth.validateToken']);
    });
});