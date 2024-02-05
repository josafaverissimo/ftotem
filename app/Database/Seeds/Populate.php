<?php

namespace App\Database\Seeds;

use App\Entities\ClientEntity;
use CodeIgniter\Database\Seeder;
use CodeIgniter\Model;
use Faker\Factory;
use App\Entities\UserEntity;
use App\Models\UserModel;
use App\Models\ClientModel;
use Faker\Generator;

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
