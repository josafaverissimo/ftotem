<?php

namespace Modules\Manager\Controllers;

use Modules\Manager\Models\UserModel;
use CodeIgniter\HTTP\RedirectResponse;
use CodeIgniter\HTTP\ResponseInterface;

class Login extends BaseController
{
    public function index(): string
    {
        return view('\Modules\Manager\Views\Pages\Login\index');
    }

    public function doLogin(): ResponseInterface
    {
        $postData = $this->request->getPost();

        if(empty($postData['username']) || empty($postData['password'])) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        $userModel = new UserModel;
        $user = $userModel->where('username', $postData['username'])->first();

        if(empty($user)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        if(!password_verify($postData['password'], $user->password)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        session()->set('user', $user);

        return $this->response->setJSON([
            'success' => true
        ]);
    }

    public function doLogout(): RedirectResponse
    {
        session()->remove('user');

        return redirect('login');
    }
}
