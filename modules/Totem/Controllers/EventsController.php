<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Models\EventModel;

class EventsController extends BaseController
{
    private EventModel $managerEventModel;

    public function __construct()
    {
        $this->managerEventModel = new EventModel;
    }

    public function getAll(): ResponseInterface
    {
        $this->managerEventModel->select('ft_events.name, ft_events.background, ft_events.active,
            ft_events_categories.name as category, GROUP_CONCAT(ft_clients.name SEPARATOR \',\') as clients'
        );
        $this->managerEventModel->join(
            'ft_events_categories',
            'ft_events_categories.id =ft_events.event_category_id'
        );
        $this->managerEventModel->join(
            'ft_events_clients',
            'ft_events_clients.event_id = ft_events.id',
            'left'
        );
        $this->managerEventModel->join(
            'ft_clients',
            'ft_clients.id = ft_events_clients.client_id',
            'left'
        );
        $this->managerEventModel->groupBy('ft_events.id');
        $this->managerEventModel->orderBy('ft_events.name', 'asc');
        $this->managerEventModel->having('ft_events.active', 'T');

        return $this->response->setJSON([
            'data' => $this->managerEventModel->findAll()
        ]);
    }
}