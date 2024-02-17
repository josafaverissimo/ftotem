<?php

namespace Modules\Manager\Repositories;

use Modules\Manager\Entities\EventEntity;
use Modules\Manager\Models\EventModel;

class EventsRepository
{
    public function __construct(readonly private EventModel $eventModel) {}

    /**
     * @return EventEntity[]
     */
    public function getAll(string $columnsString = '*'): array
    {
        return $this->eventModel->select($columnsString)->findAll();
    }
}