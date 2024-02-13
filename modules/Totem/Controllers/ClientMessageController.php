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
                'mime_in[video,video/mp4,video/webm]',
                'max_size[video,20480]'
            ]
        ];

        if(!$this->validate($validation)) {
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