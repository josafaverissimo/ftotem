<?php

namespace App\Controllers;

class EventsCategories extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Categorias dos Eventos',
            'pageHeader' => 'Categorias dos Eventos'
        ];

        return view('Dashboard/index', $data);
    }
}