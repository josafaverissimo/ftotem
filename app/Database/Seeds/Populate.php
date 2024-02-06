<?php

namespace App\Database\Seeds;

class Populate extends BaseSeeder
{
    public function run()
    {
        $this->call('DefaultUsers');
        $this->call('Users');
        $this->call('Clients');
        $this->call('EventsCategories');
    }
}
