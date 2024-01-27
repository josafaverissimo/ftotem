<?php

namespace App\Controllers;

class Dashboard extends BaseController
{
    public function index(): string
    {
        $data = [
            'title' => 'Dashboard',
            'pageHeader' => 'Dashboard'
        ];
        return view('Dashboard/index', $data);
    }
}
