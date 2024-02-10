<?php

namespace App\Database\Seeds;

use Faker\Factory;
use Modules\Manager\Models\EventClientModel;

class EventsClients extends BaseSeeder
{
    public function run(): void
    {
        $eventClientModel = new EventClientModel;
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 30; $i++) {
            $data = [
                'event_id' => $faker->numberBetween(1,30),
                'client_id' => $faker->numberBetween(1,30)
            ];

            $success = $eventClientModel->save($data);

            if(!$success) {
                $this->log($data, $eventClientModel);
            }
        }
    }
}