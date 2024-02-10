<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;

class Preflight extends BaseController
{
    public function options(): ResponseInterface
    {
        return $this->response->setStatusCode(200);
    }
}