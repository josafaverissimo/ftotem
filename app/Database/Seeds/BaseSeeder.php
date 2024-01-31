<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\Model;
use Faker\Generator;

abstract class BaseSeeder extends Seeder
{
    protected function getRandomCpfFormatted(Generator $faker): string
    {
        helper('generators');
        helper('masks');

        $cpf = $faker->unique()->numerify('#########');
        return applyCpfMask($cpf . generateCpfDigits($cpf));
    }

    protected function getRandomCellphoneFormatted(Generator $faker): string
    {
        helper('masks');

        return applyCellphoneMask($faker->unique()->numerify('###########'));
    }

    protected function getRandomCepFormatted(Generator $faker): string
    {
        helper('masks');

        return applyCepMask($faker->unique()->numerify('########'));
    }

    protected function log(array $data, Model $model): void
    {
        $logMessage = "Usuário não cadastrado: " . implode(', ', $data) . "\n
        model error: " . print_r($model->errors(), true);

        foreach(array_keys($model->errors()) as $columnError) {
            $logMessage .= "{$columnError} => {$data[$columnError]}";
        }

        $logMessage .= "\n\n";

        log_message('error', $logMessage);
    }
}