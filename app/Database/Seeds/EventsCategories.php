<?php

namespace App\Database\Seeds;

use App\Entities\EventCategoryEntity;
use App\Models\EventCategoryModel;
use Faker\Factory;

class EventsCategories extends BaseSeeder
{
    public function run(): void
    {
        $eventCategoryModel = new EventCategoryModel();
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 30; $i++) {
            $eventCategory = new EventCategoryEntity();
            $data = [
                'name' => "{$faker->firstName()} {$faker->lastName()}",
            ];
            $eventCategory->fill($data);

            $success = $eventCategoryModel->save($eventCategory);

            if(!$success) {
                $this->log($data, $eventCategoryModel);
            }
        }
    }
}