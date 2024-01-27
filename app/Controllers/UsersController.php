<?php

namespace App\Controllers;

use App\Entities\UserEntity;
use App\Models\UserModel;

class UsersController extends BaseController
{
    private UserEntity $userEntity;
    private UserModel $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function index()
    {
        $data = [
            'title' => 'Usuários',
            'pageHeader' => 'Usuários'
        ];

        return view('Users/index', $data);
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