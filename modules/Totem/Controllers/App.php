<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;

class App extends BaseController
{
    public function index(): string
    {
        return view('\Modules\Totem\Views\app');
    }
}