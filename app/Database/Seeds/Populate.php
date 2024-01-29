<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;
use App\Entities\UserEntity;
use App\Models\UserModel;

class Populate extends Seeder
{
    private function populateUsers(): void
    {
        helper('generators');
        helper('masks');

        $userModel = new UserModel();

        for($i = 0; $i <= 1000; $i++) {
            $faker = Factory::create('pt_BR');
            $user = new UserEntity();
            $cpf = $faker->unique()->numerify('#########');
            $data = [
                'name' => "{$faker->firstName()} {$faker->lastName()}",
                'username' => $faker->userName(),
                'cpf' => applyCpfMask($cpf . generateCpfDigits($cpf)),
                'cellphone' => applyCellphoneMask($faker->unique()->numerify('###########')),
                'password' => $faker->password(8)
            ];
            $user->fill($data);

            $success = $userModel->save($user);

            if(!$success) {
                log_message('error', "Usuário não cadastrado: " . implode(', ', $data) . "\n
                model error: " . implode(', ', $userModel->errors()) . "
                ");
            }
        }
    }

    public function run()
    {
        $this->populateUsers();
    }
}
