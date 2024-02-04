<?php

namespace App\Controllers;

class Dashboard extends BaseController
{
    public function index(): string
    {
        $data = [
            'title' => 'Dashboard',
            'pageHeader' => 'Dashboard',
            'styles' => ['assets/css/dashboard/styles.css']
        ];
        return view('Pages/Dashboard/index', $data);
    }
}
