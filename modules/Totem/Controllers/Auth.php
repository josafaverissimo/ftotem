<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use App\Libraries\Jwt\Token;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Models\UserModel;

class Login extends BaseController
{
    public function doLogin(): ResponseInterface
    {
        $post = $this->request->getPost();

        if(empty($post['username']) || empty($post['password'])) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        $userModel = new UserModel;
        $user = $userModel->where('username', $post['username'])->first();

        if(empty($user)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        if(!password_verify($post['password'], $user->password)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        return $this->response->setJSON([
            'success' => true,
            'token' => Token::encode([
                'name' => $user->name
            ])
        ]);
    }
}