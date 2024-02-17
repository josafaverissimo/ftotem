<?php

namespace Modules\Manager\Repositories;

use Modules\Manager\Models\EventVideoModel;

class EventsVideosRepository
{
    readonly private EventVideoModel $eventVideoModel;

    public function __construct(EventVideoModel $eventVideoModel) {
        $this->eventVideoModel = $eventVideoModel;
    }

    public function getDataByEventId(int $eventId): array
    {
        return $this->eventVideoModel->getVideosWithEventByEventId($eventId);
    }

    public function deleteByVideoId(int $videoId): bool
    {
        return $this->eventVideoModel->delete($videoId);
    }
}