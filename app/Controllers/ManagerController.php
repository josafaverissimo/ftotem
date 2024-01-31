<?php

namespace App\Controllers;

use App\Libraries\MyTable\TableData;
use CodeIgniter\Entity\Entity;
use CodeIgniter\Model;
use CodeIgniter\HTTP\ResponseInterface;

abstract class ManagerController extends BaseController
{
    private Model $model;
    protected string $entityClass;
    protected array $tableColumns;
    protected array $tableBodyFormatters;

    public function __construct(Model $model) {
        $this->model = $model;
    }

    private function getTableDataBody(array $rows): array
    {
        $tableData = new TableData();
        $tableData->setHead($this->tableColumns);
        $tableData->setFormatters($this->tableBodyFormatters);
        $tableData->setBody($rows);

        return $tableData->getBody();
    }

    public function get(): ResponseInterface
    {
        $term = $this->request->getGet('term');
        $order = $this->request->getGet('order');
        $orderBy = $this->request->getGet('orderBy');

        $this->model->select(implode(',', $this->tableColumns));

        if(!empty($term)) {
            $this->model->groupStart();

            foreach($this->tableColumns as $column) {
                $this->model->orLike($column, $term);
            }
            $this->model->groupEnd();
        }

        if(!empty($order) && !empty($orderBy)) {
            $this->model->orderBy($orderBy, $order);
        }

        $rows = $this->model->asArray()->paginate(15);

        return $this->response->setJSON([
            'pageCount' => $this->model->pager->getPageCount(),
            'data' => $this->getTableDataBody($rows)
        ]);
    }

    public function save(): ResponseInterface
    {
        $postData = $this->request->getPost();
        /** @var Entity $entity */
        $entity = new $this->entityClass;
        $entity->fill($postData);
        $success = $this->model->save($entity);

        return $this->response->setJSON([
            'success' => $success,
            'errors' => $this->model->errors()
        ]);
    }

    public function delete(): ResponseInterface
    {
        $data = json_decode($this->request->getBody());

        if(empty($data)) {
            return $this->response->setJSON([
                'success' => false,
                'message' => 'Nenhum dado enviado',
                'errors' => []
            ]);
        }

        $ids = $data->ids;
        $operationSuccess = true;
        $errors = [];

        foreach($ids as $id) {
            $success = $this->model->delete($id);

            if(!$success) {
                $operationSuccess = false;

                $errors[] = $id;
            }
        }

        return $this->response->setJSON([
            'success' => $operationSuccess,
            'errors' => $errors
        ]);
    }
}