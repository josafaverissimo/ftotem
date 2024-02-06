<?php

namespace App\Database\Seeds;

use Modules\Manager\Entities\UserEntity;
use Modules\Manager\Models\UserModel;
use Faker\Factory;

class Users extends BaseSeeder
{
    public function run(): void
    {
        $userModel = new UserModel();
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 30; $i++) {
            $user = new UserEntity();
            $data = [
                'name' => "{$faker->firstName()} {$faker->lastName()}",
                'username' => $faker->userName(),
                'cpf' => $this->getRandomCpfFormatted($faker),
                'cellphone' => $this->getRandomCellphoneFormatted($faker),
                'password' => $faker->password(8)
            ];
            $user->fill($data);

            $success = $userModel->save($user);

            if(!$success) {
                $this->log($data, $userModel);
            }
        }
    }
}