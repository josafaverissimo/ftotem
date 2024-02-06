<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Entities\UserEntity;
use Modules\Manager\Models\UserModel;

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
        'name' => 'capitalize',
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
            'styles' => ['assets/css/myTable/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
                ['src' => 'assets/js/users/main.js', 'type' => 'module'],
                ['src' => 'assets/js/users/scripts.js', 'type' => 'module']
            ],
            'myTableModalComponent' => newView('\Modules\Manager\Views\Components\myTableModal', [
                'modalHeader' => 'Formulário de Usuários',
                'formViewPath' => '\Modules\Manager\Views\Pages\Users\Partials/form'
            ]),
            'myTableComponent' => newView('\Modules\Manager\Views\Components\myTable', [
                'id' => 'usersTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('\Modules\Manager\Views\Pages\Manager\index', $data);
    }
}