<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Minify implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $bodyMinified = preg_replace(
            "/> +</",
            "><",
            preg_replace(
                "/\s+/i",
                " ",
                $response->getBody(),
            )
        );
        $response->setBody($bodyMinified);
    }
}