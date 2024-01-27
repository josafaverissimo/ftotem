<?php

namespace App\Controllers;

class Events extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Eventos',
            'pageHeader' => 'Eventos'
        ];

        return view('Dashboard/index', $data);
    }
}