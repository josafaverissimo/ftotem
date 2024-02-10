<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use App\Libraries\Jwt\Token;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Models\UserModel;

class Auth extends BaseController
{
    public function doLogin(): ResponseInterface
    {
        $jsonBody = json_decode($this->request->getBody());

        if(empty($jsonBody->username) || empty($jsonBody->password)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        $userModel = new UserModel;
        $user = $userModel->where('username', $jsonBody->username)->first();

        if(empty($user)) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        if(!password_verify($jsonBody->password, $user->password)) {
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

    public function validateToken(): ResponseInterface
    {
        $decoded = Token::decode();

        return $this->response->setJSON([
            'success' => $decoded !== false
        ]);
    }
}