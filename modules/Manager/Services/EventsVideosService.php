<?php

namespace Modules\Manager\Services;

use Modules\Manager\Repositories\EventsVideosRepository;

class EventsVideosService
{
    readonly private EventsVideosRepository $eventsVideosRepository;

    public function __construct(EventsVideosRepository $eventsVideosRepository)
    {
        $this->eventsVideosRepository = $eventsVideosRepository;
    }

    public function getEventsVideosDataByEventId(int $eventId): array
    {
        return $this->eventsVideosRepository->getDataByEventId($eventId);
    }

    public function deleteByVideoId(int $videoId): bool
    {
        return $this->eventsVideosRepository->deleteByVideoId($videoId);
    }
}