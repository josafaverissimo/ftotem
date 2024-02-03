<?php

namespace App\Controllers;

use App\Entities\EventEntity;
use App\Models\EventModel;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\ComponentsRender\Render;

class EventsController extends ManagerController
{
    protected string $entityClass = EventEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'active',
        'event_category_id',
        'background',
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
            'myTableModalComponent' => newView('Components/myTableModal', [
                'modalHeader' => 'Formulário de Eventos',
                'formViewPath' => 'Pages/Events/Partials/form'
            ]),
            'myTableComponent' => newView('Components/myTable', [
                'id' => 'eventsTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('Pages/Manager/index', $data);
    }

    private function getBackgroundFileValidation(): array
    {
        return [
            'label' => '',
            'rules' => [
                'required',
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
                'clients_ids' => "required|numeric"
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

        if(!empty($img)) {
            $newName = $img->getRandomName();
            $img->move(ROOTPATH . 'public/uploads/events', $newName);
            $backgroundInfo = ['background' => $newName];
        }

        $success = $this->saveByData([
            ...$backgroundInfo,
            ...$postData
        ]);



        return $this->response->setJSON([
            'success' => $success,
            'errors' => $this->model->errors()
        ]);
    }
}