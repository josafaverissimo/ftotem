<?php

namespace App\Controllers;

use App\Entities\UserEntity;
use App\Libraries\MyTable\PaginationMetadata;
use App\Models\UserModel;
use App\Libraries\MyTable\TableData;
use CodeIgniter\HTTP\ResponseInterface;

class UsersController extends BaseController
{
    private UserModel $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    private function getUserTableColumns(): array
    {
        return [
            'id',
            'name',
            'username',
            'cpf',
            'cellphone',
            'created_at'
        ];
    }

    public function index()
    {
        $data = [
            'title' => 'Usuários',
            'pageHeader' => 'Usuários',
            'userTableColumns' => $this->getUserTableColumns()
        ];

        return view('Users/index', $data);
    }

    private function getUsersTableDataBody(array $users): array
    {
        helper('masks');

        $tableData = new TableData();
        $tableData->setHead($this->getUserTableColumns());
        $tableData->setFormatters([
            'created_at' => applyDateBrFormat(...)
        ]);
        $tableData->setBody($users);

        return $tableData->getBody();
    }

    public function get(): ResponseInterface
    {
        $term = $this->request->getGet('term');

        $this->userModel->select('id, name, username, cpf, cellphone, created_at');

        if(!empty($term)) {
            $this->userModel->like('name', $term)
                ->orLike('username', $term)
                ->orLike('cpf', $term)
                ->orLike('cellphone', $term);
        }

        $usersData = $this->userModel->asArray()->paginate(15);

        return $this->response->setJSON([
            'pageCount' => $this->userModel->pager->getPageCount(),
            'data' => $this->getUsersTableDataBody($usersData)
        ]);
    }

    public function save()
    {
        $postData = $this->request->getPost();
        $user = new UserEntity();
        $user->fill($postData);
        $success = $this->userModel->save($user);

        return $this->response->setJSON([
            'success' => $success,
            'errors' => $this->userModel->errors()
        ]);
    }
}