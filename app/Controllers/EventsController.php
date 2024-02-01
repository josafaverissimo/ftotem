<?php

namespace App\Controllers;

use App\Entities\UserEntity;
use App\Models\EventModel;

class EventsController extends ManagerController
{
    protected string $entityClass = UserEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'background',
        'active',
        'event_category_id',
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
    }
    public function index(): string
    {
        $data = [
            'title' => 'Eventos',
            'pageHeader' => 'Eventos',
            'tableTitle' => 'Tabela de Eventos',
            'styles' => ['assets/css/myTable/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
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
}