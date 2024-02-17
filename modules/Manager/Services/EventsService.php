<?php

namespace Modules\Manager\Services;

use Modules\Manager\Entities\EventEntity;
use Modules\Manager\Repositories\EventsRepository;

class EventsService
{
    public function __construct(readonly private EventsRepository $eventRepository) {}

    /**
     * @return EventEntity[]
     */
    public function getAll(string $columnsString = '*'): array
    {
        return $this->eventRepository->getAll($columnsString);
    }
}