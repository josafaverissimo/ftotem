<?php

use CodeIgniter\Router\RouteCollection;

/**
* @var RouteCollection $routes
*/

$routes->group('totem-api', static function($routes) {
    $routes->group('auth', static function($routes) {
        $routes->post('doLogin', [\Modules\Totem\Controllers\AuthController::class, 'doLogin'],
            ['as' => 'totem-api.auth.doLogin']
        );
        $routes->get('validateToken', [\Modules\Totem\Controllers\AuthController::class, 'validateToken'],
            ['as' => 'totem-api.auth.validateToken']
        );
    });

    $routes->group('events', static function($routes) {
        $routes->get('getAll', [\Modules\Totem\Controllers\EventsController::class, 'getAll'],
            ['as' => 'totem-api.events.getAll']
        );

        $routes->get('getByHash/(:hash)', [\Modules\Totem\Controllers\EventsController::class, 'getByHash'],
            ['as' => 'totem-api.events.getByHash']
        );
    });

    $routes->group('clientsMessage', static function($routes) {
       $routes->post('uploadVideo', [\Modules\Totem\Controllers\ClientMessageController::class, 'uploadVideo'],
           ['as' => 'totem-api.clientsMessages.uploadVideo']
       );
    });
});