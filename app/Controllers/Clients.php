<?php

namespace App\Controllers;

class Clients extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Clientes',
            'pageHeader' => 'Clientes'
        ];

        return view('Dashboard/index', $data);
    }
}