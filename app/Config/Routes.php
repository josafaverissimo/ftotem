<?php

use CodeIgniter\Router\RouteCollection;

$modulesPath = ROOTPATH . 'modules/';
$modules = scandir($modulesPath);

foreach($modules as $module) {
    if($module === '.' || $module === '..') {
        continue;
    }

    $moduleRoutesFile = $modulesPath . "{$module}/Config/Routes.php";

    if(file_exists($moduleRoutesFile)) {
        require $moduleRoutesFile;
    }
}
