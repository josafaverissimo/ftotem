<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class ClientMessageController extends BaseController
{
    public function uploadVideo(): ResponseInterface
    {
        $validation = [
            'video' => [
                'uploaded[video]',
                'max_size[video,61440]'
            ]
        ];
        $customMessages = [
          'video' => [
              'max_size' => 'O arquivo é muito grande. Tente Gravar com um tempo menor.'
          ]
        ];

        if(!$this->validate($validation, $customMessages)) {
            return $this->response->setJSON([
                'success' => false,
                'errors' => $this->validator->getErrors()
            ]);
        }

        $video = $this->request->getFile('video');
        $type = explode('/', $video->getMimeType())[0];

        if($type !== 'video') {
            return $this->response->setJSON([
                'success' => false,
                'errors' => [
                    'video' => 'O formato do arquivo não é válido'
                ]
            ]);
        }

        $videoRandomName = $video->getRandomName();
        $video->move(ROOTPATH . 'public/uploads/clientsMessages', $videoRandomName);

        return $this->response->setJSON([
            'success' => true
        ]);
    }
}