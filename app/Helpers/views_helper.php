<?php

use Config\View;

function newView(string $viewPath, array $data = []): string {
    $config = config(View::class);
    $view = new \CodeIgniter\View\View($config, $viewPath);

    return $view->setData($data)->render($viewPath);
}