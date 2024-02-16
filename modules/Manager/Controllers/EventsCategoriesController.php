<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Entities\EventCategoryEntity;
use Modules\Manager\Models\EventCategoryModel;
use CodeIgniter\HTTP\ResponseInterface;

class EventsCategoriesController extends ManagerController
{
    protected string $entityClass = EventCategoryEntity::class;
    protected array $tableColumns = [
        'id',
        'name',
        'created_at'
    ];
    protected array $tableBodyFormatters = [
        'name' => 'capitalize',
        'created_at' => 'applyDateBrFormat'
    ];

    public function __construct()
    {
        helper('masks');

        parent::__construct(new EventCategoryModel);
    }
    public function index()
    {
        $data = [
            'title' => 'Categorias de Eventos',
            'pageHeader' => 'Categorias de Eventos',
            'tableTitle' => 'Tabela das Categorias de Eventos',
            'styles' => ['assets/css/myTable/styles.css'],
            'scripts' => [
                ['src' => 'assets/js/myTable/main.js', 'type' => 'module'],
                ['src' => 'assets/js/eventsCategories/main.js', 'type' => 'module'],
                ['src' => 'assets/js/eventsCategories/scripts.js', 'type' => 'module']
            ],
            'myTableModalComponent' => newView('\Modules\Manager\Views\Components\myTableModal', [
                'modalHeader' => 'Formulário das Categorias de Eventos',
                'formViewPath' => '\Modules\Manager\Views\Pages\EventsCategories\Partials\form'
            ]),
            'myTableComponent' => newView('\Modules\Manager\Views\Components\myTable', [
                'id' => 'eventsCategoriesTable',
                'columns' => $this->tableColumns
            ])
        ];

        return view('\Modules\Manager\Views\Pages\Manager\index', $data);
    }

    public function getAll(): ResponseInterface
    {
        $eventsCategories = $this->model->select('id, name')->asArray()->findAll();
        return $this->response->setJSON($eventsCategories);
    }
}