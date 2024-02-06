<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Entities\EventClientEntity;
use Modules\Manager\Entities\EventEntity;
use Modules\Manager\Models\EventClientModel;
use Modules\Manager\Models\EventModel;
use CodeIgniter\Database\Exceptions\DatabaseException;
use CodeIgniter\HTTP\ResponseInterface;

class EventsController extends ManagerController
{
    protected string $entityClass = EventEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'category',
        'background',
        'clients',
        'active',
        'created_at'
    ];
    protected array $tableBodyFormatters = [
        'name' => 'capitalize',
        'created_at' => 'applyDateBrFormat'
    ];

    public function __construct()
    {
        helper('masks');

        parent::__construct(new EventModel());

        $this->tableBodyFormatters['background'] = fn($backgroundPath) => "events/{$backgroundPath}";
    }

    public function index(): string
    {
        $data = [
            'title' => 'Eventos',
            'pageHeader' => 'Eventos',
            'tableTitle' => 'Tabela de Eventos',
            'styles' => [
                'assets/css/myTable/styles.css',
                'assets/css/mySelect/styles.css',
                'assets/css/myFileInput/styles.css'
            ],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
                ['src' => 'assets/js/mySelect/main.js', 'type' => 'module'],
                ['src' => 'assets/js/events/main.js', 'type' => 'module'],
                ['src' => 'assets/js/events/scripts.js', 'type' => 'module']
            ],
            'myTableModalComponent' => newView('Modules\Manager\Views\Components\myTableModal', [
                'modalHeader' => 'Formulário de Eventos',
                'formViewPath' => 'Modules\Manager\Views\Pages\Events\Partials\form'
            ]),
            'myTableComponent' => newView('\Modules\Manager\Views\Components\myTable', [
                'id' => 'eventsTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('\Modules\Manager\Views\Pages\Manager\index', $data);
    }

    private function getBackgroundFileValidation(): array
    {
        return [
            'label' => '',
            'rules' => [
                'uploaded[background]',
                'is_image[background]',
                'mime_in[background,image/jpeg,image/jpg,image/png]',
                'max_size[background,5120]'
            ]
        ];
    }

    public function save(): ResponseInterface
    {
        $postData = $this->request->getPost();

        if(!isset($postData['id'])) {
            $validations = [
                'background' => $this->getBackgroundFileValidation(),
                'clients_ids.*' => "required|numeric"
            ];
            $isValid = $this->validate($validations);
            $errors = $this->validator->getErrors();

            if(isset($errors['clients_ids'])) {
                $errors['clients_ids[]'] = $errors['clients_ids'];
                unset($errors['clients_ids']);
            }

            if (!$isValid) {
                return $this->response->setJSON([
                    'success' => false,
                    'errors' => $errors
                ]);
            }
        }

        $postData = $this->request->getPost();
        $img = $this->request->getFile('background');
        $backgroundInfo = [];

        $postData['active'] ??= 'F';



        if(!empty($img)) {
            $newName = $img->getRandomName();
            $img->move(ROOTPATH . 'public/uploads/events', $newName);
            $backgroundInfo = ['background' => $newName];
        }

        $success = $this->saveByData([
            ...$backgroundInfo,
            ...$postData
        ]);

        if(!$success) {
            return $this->response->setJSON([
                'success' => false,
                'errors' => $this->model->errors()
            ]);
        }

        if(!empty($postData['clients_ids'])) {
            $eventClientModel = new EventClientModel();

            if(!empty($postData['id'])) {
                $eventClientModel->where('event_id', $postData['id'])->delete();
                $id = $postData['id'];
            }

            $id ??= db_connect()->insertID();

            $eventsClientsIdsWithEventId = array_map(function($clientId) use ($id) {
                return [
                    'event_id' => $id,
                    'client_id' => $clientId
                ];
            }, $postData['clients_ids']);

            try {
                $eventClientModel->insertBatch($eventsClientsIdsWithEventId);
            } catch(DatabaseException $exception) {
                log_message('error', "{$exception->getMessage()} - data: clients_ids[](" . implode(",", $postData['clients_ids']) . ") event_id({$id})");

                return $this->response->setJSON([
                    'success' => false,
                    'errors' => [
                        'clients_ids[]' => 'Não foi possível relacionar os clientes ao evento'
                    ]
                ]);
            }
        }

        return $this->response->setJSON([
            'success' => true,
            'errors' => $this->model->errors()
        ]);
    }

    public function get(): ResponseInterface
    {
        $columns = [
            'ft_events.id',
            'ft_events.name',
            'ft_events_categories.name',
            'ft_events.background',
            'GROUP_CONCAT(ft_clients.name SEPARATOR \',\')',
            'ft_events.active',
            'ft_events.created_at'
        ];
        $aliases = [
            'ft_events_categories.name' => 'category',
            'GROUP_CONCAT(ft_clients.name SEPARATOR \',\')' => 'clients'
        ];

        $selectColumnsString = rtrim(array_reduce($columns, function($columnsString, $column) use ($aliases) {
            $columnsString .= "$column";

            if(isset($aliases[$column])) {
                $columnsString .= " as {$aliases[$column]}";
            }

            return "$columnsString,";
        }, ''), ',');

        $this->model->select($selectColumnsString);
        $this->model->join('ft_events_categories', 'ft_events_categories.id = ft_events.event_category_id');
        $this->model->join('ft_events_clients', 'ft_events_clients.event_id = ft_events.id', 'left');
        $this->model->join('ft_clients', 'ft_clients.id = ft_events_clients.client_id', 'left');

        $this->model->groupBy('ft_events.id');

        $this->filterByTerm($columns);
        $this->orderBy();

        $rows = $this->model->asArray()->paginate(15);

        return $this->response->setJSON([
            'pageCount' => $this->model->pager->getPageCount(),
            'data' => $this->getTableDataBody($rows)
        ]);
    }
}