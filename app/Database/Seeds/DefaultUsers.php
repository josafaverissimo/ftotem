<?php

namespace App\Database\Seeds;

use App\Entities\UserEntity;
use App\Models\UserModel;
use Faker\Factory;

class DefaultUsers extends BaseSeeder
{
    public function run(): void
    {
        $userModel = new UserModel();
        $faker = Factory::create('pt_BR');

        $user = new UserEntity();
        $users = [
            [
                'name' => "Josafá Veríssimo Gomes",
                'username' => 'josafa.verissimo',
                'cpf' => $this->getRandomCpfFormatted($faker),
                'cellphone' => $this->getRandomCellphoneFormatted($faker),
                'password' => 'josafa123'
            ],
            [
                'name' => "Dayse Acyoli",
                'username' => 'dayse.acyoli',
                'cpf' => $this->getRandomCpfFormatted($faker),
                'cellphone' => $this->getRandomCellphoneFormatted($faker),
                'password' => 'dayse123'
            ]
        ];

        foreach($users as $data) {
            $user->fill($data);

            $success = $userModel->save($user);

            if (!$success) {
                $this->log($data, $userModel);
            }
        }
    }
}