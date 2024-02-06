<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Entities\ClientEntity;
use Modules\Manager\Models\ClientModel;
use CodeIgniter\HTTP\ResponseInterface;

class ClientsController extends ManagerController
{
    protected string $entityClass = ClientEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'cpf',
        'cellphone',
        'cep',
        'state',
        'city',
        'address',
        'neighborhood',
        'house_number',
        'created_at'
    ];
    protected array $tableBodyFormatters = [
        'name' => 'capitalize',
        'state' => 'mb_strtoupper',
        'city' => 'capitalize',
        'address' => 'capitalize',
        'neighborhood' => 'capitalize',
        'created_at' => 'applyDateBrFormat'
    ];

    public function __construct()
    {
        helper('masks');

        parent::__construct(new ClientModel());
    }

    public function index(): string
    {
        $data = [
            'title' => 'Clientes',
            'pageHeader' => 'Clientes',
            'styles' => ['assets/css/myTable/styles.css', 'assets/css/mySelect/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
                ['src' => 'assets/js/mySelect/main.js', 'type' => 'module'],
                ['src' => 'assets/js/clients/scripts.js', 'type' => 'module']
            ],
            'myTableModalComponent' => newView('\Modules\Manager\Views\Components\myTableModal', [
                'modalHeader' => 'Formulário de Clientes',
                'formViewPath' => '\Modules\Manager\Views\Pages\Clients\Partials\form'
            ]),
            'myTableComponent' => newView('\Modules\Manager\Views\Components\myTable', [
                'id' => 'clientsTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('\Modules\Manager\Views\Pages\Manager\index', $data);
    }



    public function getAll(): ResponseInterface
    {
        $clients = $this->model->select('id, name')->asArray()->findAll();
        return $this->response->setJSON($clients);
    }
}