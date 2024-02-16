<?php

namespace Modules\Manager\Controllers;

use App\Controllers\BaseController;

class EventsVideos extends BaseController
{
    public function index(): string
    {
        return view('Modules\Manager\Views\Pages\EventsVideos\index');
    }
}