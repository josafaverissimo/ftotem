<?php

namespace Modules\Manager\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Models\EventVideoModel;
use Modules\Manager\Repositories\EventsVideosRepository;
use Modules\Manager\Services\EventsVideosService;

class EventsVideos extends BaseController
{
    readonly private EventVideoModel $eventVideoModel;
    readonly private EventsVideosRepository $eventsVideosRepository;
    readonly private EventsVideosService $eventsVideosService;

    public function __construct()
    {
        $this->eventVideoModel = new EventVideoModel;
        $this->eventsVideosRepository = new EventsVideosRepository($this->eventVideoModel);
        $this->eventsVideosService = new EventsVideosService($this->eventsVideosRepository);
    }

    public function index(): string
    {
        return view('Modules\Manager\Views\Pages\EventsVideos\index', [
            'title' => 'Vídeos dos Eventos',
            'pageHeader' => 'Vídeos dos Eventos',
            'styles' => ['assets/css/mySelect/styles.css', 'assets/css/eventsVideos/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/eventsVideos/main.js', 'type' => 'module'],
                ['src' => 'assets/js/eventsVideos/scripts.js', 'type' => 'module']
            ]
        ]);
    }

    public function getVideosDataByEventId(int $eventId): ResponseInterface
    {
        return $this->response->setJSON([
            'data' => $this->eventsVideosService->getEventsVideosDataByEventId($eventId)
        ]);
    }

    public function delete(int $videoId, int $eventId, string $filename): ResponseInterface
    {
        unlink(ROOTPATH . "public/uploads/events-videos/{$eventId}/{$filename}");

        return $this->response->setJSON([
            'success' => $this->eventsVideosService->deleteByVideoId($videoId)
        ]);
    }
}