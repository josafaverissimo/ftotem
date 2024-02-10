<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Libraries\MyTable\TableData;
use CodeIgniter\Entity\Entity;
use CodeIgniter\Model;
use CodeIgniter\HTTP\ResponseInterface;
use App\Controllers\BaseController;

abstract class ManagerController extends BaseController
{
    protected Model $model;
    protected string $entityClass;
    protected array $tableColumns;
    protected array $tableBodyFormatters;

    public function __construct(Model $model) {
        $this->model = $model;
    }

    protected function getTableDataBody(array $rows): array
    {
        $tableData = new TableData();
        $tableData->setHead($this->tableColumns);
        $tableData->setFormatters($this->tableBodyFormatters);
        $tableData->setBody($rows);

        return $tableData->getBody();
    }

    protected function filterByTerm(array $columns = null): void
    {
        $term = $this->request->getGet('term');

        if(!empty($term)) {
            $columns ??= $this->tableColumns;

            $this->model->groupStart();

            foreach ($columns as $column) {
                $this->model->orLike($column, $term);
            }
            $this->model->groupEnd();
        }
    }

    protected function orderBy(): void
    {
        $order = $this->request->getGet('order');
        $orderBy = $this->request->getGet('orderBy');

        if(!empty($order) && !empty($orderBy)) {
            $this->model->orderBy($orderBy, $order);
        }
    }

    public function get(): ResponseInterface
    {
        $this->model->select(implode(',', $this->tableColumns));

        $this->filterByTerm();
        $this->orderBy();

        $rows = $this->model->asArray()->paginate(15);

        return $this->response->setJSON([
            'pageCount' => $this->model->pager->getPageCount(),
            'data' => $this->getTableDataBody($rows)
        ]);
    }

    public function save(): ResponseInterface
    {
        $postData = $this->request->getPost();
        $success = $this->saveByData($postData);

        return $this->response->setJSON([
            'success' => $success,
            'errors' => $this->model->errors()
        ]);
    }

    protected function saveByData(array $data): bool
    {
        /** @var Entity $entity */
        $entity = new $this->entityClass;
        $entity->fill($data);

        return $this->model->save($entity);
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