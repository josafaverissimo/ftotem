<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;

class Dashboard extends BaseController
{
    public function index(): ResponseInterface|string
    {
        $data = [
            'title' => 'Dashboard',
            'pageHeader' => 'Dashboard',
            'styles' => ['assets/css/dashboard/styles.css']
        ];
        return view('Pages/Dashboard/index', $data);
    }
}
