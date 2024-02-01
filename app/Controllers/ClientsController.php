<?php

namespace App\Controllers;

use App\Entities\ClientEntity;
use App\Models\ClientModel;

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
            'tableTitle' => 'Tabela de Clientes',
            'styles' => ['assets/css/myTable/styles.css', 'assets/css/mySelect/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
                ['src' => 'assets/js/mySelect/main.js', 'type' => 'module'],
                ['src' => 'assets/js/clients/scripts.js', 'type' => 'module']
            ],
            'myTableModalComponent' => newView('Components/myTableModal', [
                'modalHeader' => 'Formulário de Clientes',
                'formViewPath' => 'Pages/Clients/Partials/form'
            ]),
            'myTableComponent' => newView('Components/myTable', [
                'id' => 'clientsTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('Pages/Manager/index', $data);
    }
}