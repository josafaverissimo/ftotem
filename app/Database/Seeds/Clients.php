<?php

namespace App\Database\Seeds;

use App\Entities\ClientEntity;
use App\Models\ClientModel;
use Faker\Factory;

class Clients extends BaseSeeder
{
    public function run(): void
    {
        $clientModel = new ClientModel();
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 10; $i++) {
            $client = new ClientEntity();
            $data = [
                'name' => "{$faker->firstName()} {$faker->lastName()}",
                'cpf' => $this->getRandomCpfFormatted($faker),
                'cellphone' => $this->getRandomCellphoneFormatted($faker),
                'cep' => $this->getRandomCepFormatted($faker),
                'state' => $faker->unique()->regexify('[abcedfghijklmopqrstuvxwyz]{2}'),
                'city' => $faker->unique()->city(),
                'address' => str_replace(['-', "\n"], '', $faker->unique()->address()),
                'neighborhood' => "{$faker->firstName()} {$faker->lastName()} {$faker->lastName()}",
                'house_number' => $faker->unique()->regexify('[0-9]{1,3}')
            ];
            $client->fill($data);

            $success = $clientModel->save($client);

            if(!$success) {
                $this->log($data, $clientModel);
            }
        }
    }
}