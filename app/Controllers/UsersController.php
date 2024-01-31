<?php

namespace App\Controllers;

use App\Entities\UserEntity;
use App\Models\UserModel;

class UsersController extends ManagerController
{
    protected string $entityClass = UserEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'username',
        'cpf',
        'cellphone',
        'created_at'
    ];
    protected array $tableBodyFormatters = [
        'created_at' => 'applyDateBrFormat'
    ];

    public function __construct()
    {
        helper('masks');

        parent::__construct(new UserModel());
    }

    public function index(): string
    {
        $data = [
            'title' => 'Usuários',
            'pageHeader' => 'Usuários',
            'tableTitle' => 'Tabela de Usuários',
            'tableColumns' => $this->tableColumns
        ];

        return view('Pages/Users/index', $data);
    }
}