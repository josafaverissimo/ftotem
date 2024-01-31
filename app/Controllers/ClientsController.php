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
            'tableColumns' => $this->tableColumns
        ];

        return view('Pages/Clients/index', $data);
    }
}