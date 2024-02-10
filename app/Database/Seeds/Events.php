<?php

namespace App\Database\Seeds;

use Faker\Factory;
use Modules\Manager\Models\EventModel;

class Events extends BaseSeeder
{
    public function run(): void
    {
        $eventModel = new EventModel;
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 30; $i++) {
            $data = [
                'name' => "{$faker->firstName()} {$faker->lastName()}",
                'background' => '1707581679_501a8a48aa0685241ddc.jpg',
                'active' => ['F', 'T'][$faker->numberBetween(0, 1)],
                'event_category_id' => $faker->numberBetween(1, 4),
                'password' => $faker->password(8)
            ];

            $success = $eventModel->save($data);

            if(!$success) {
                $this->log($data, $eventModel);
            }
        }
    }
}