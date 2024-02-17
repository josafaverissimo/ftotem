<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Entities\EventVideoEntity;
use Modules\Manager\Models\EventModel;
use Modules\Manager\Models\EventVideoModel;

class ClientMessageController extends BaseController
{
    public function uploadVideo(): ResponseInterface
    {
        $validation = [
            'video' => [
                'uploaded[video]',
                'max_size[video,61440]'
            ],
            'event_hash' => [
                'required'
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

        $eventHash = $this->request->getPost('event_hash');
        $managerEventModel = new EventModel;
        $event = $managerEventModel->select('id')->where('hash', $eventHash)->first();

        if(!$event) {
            return $this->response->setJSON([
                'success' => false,
                'errors' => [
                    'video' => 'Evento não encontrado. Entre em contato com o administrador.'
                ]
            ]);
        }

        $videoRandomName = $video->getRandomName();
        $moved = $video->move(ROOTPATH . "/public/uploads/events-videos/{$event->id}", $videoRandomName);

        if(!$moved) {
            return $this->response->setJSON([
                'success' => false
            ]);
        }

        $managerEventVideoEntity = new EventVideoEntity;
        $managerEventVideoEntity->video = $videoRandomName;
        $managerEventVideoEntity->event_id = $event->id;

        $managerEventVideoModel = new EventVideoModel;
        $managerEventVideoModel->insert($managerEventVideoEntity);

        return $this->response->setJSON([
            'success' => true
        ]);
    }
}