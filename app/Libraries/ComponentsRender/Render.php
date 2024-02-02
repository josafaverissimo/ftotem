<?php

namespace App\Libraries\ComponentsRender;

class Render
{
    public static function modalViewBackgroundRow(): string
    {
        helper('views');

        return newView('Components/modalViewBackgroundRow');
    }
}