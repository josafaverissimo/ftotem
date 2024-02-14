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
                'mime_in[video,video/*]',
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
        $videoRandomName = $video->getRandomName();
        $video->move(ROOTPATH . 'public/uploads/clientsMessages', $videoRandomName);

        return $this->response->setJSON([
            'success' => true
        ]);
    }
}