<?php

namespace Modules\Manager\Controllers;

use App\Controllers\BaseController;

class Dashboard extends BaseController
{
    public function index(): string
    {
        $data = [
            'title' => 'Dashboard',
            'pageHeader' => 'Dashboard',
            'styles' => ['assets/css/dashboard/styles.css']
        ];
        return view('\Modules\Manager\Views\Pages\Dashboard\index', $data);
    }
}
