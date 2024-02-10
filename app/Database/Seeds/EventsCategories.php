<?php

namespace App\Database\Seeds;

use Modules\Manager\Entities\EventCategoryEntity;
use Modules\Manager\Models\EventCategoryModel;
use Faker\Factory;

class EventsCategories extends BaseSeeder
{
    public function run(): void
    {
        $eventCategoryModel = new EventCategoryModel();
        $faker = Factory::create('pt_BR');

        for($i = 0; $i <= 4; $i++) {
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