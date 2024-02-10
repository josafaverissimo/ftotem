<?php

namespace Modules\Totem\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Modules\Manager\Models\ClientModel;

class Clients extends BaseController
{
    private ClientModel $model;

    public function __construct()
    {
        $this->model = new ClientModel();
    }

    public function getByIdOrCpf(string $idOrCpf): ResponseInterface
    {
        $clients = $this->model->select('name')
            ->where('id', $idOrCpf)
            ->orWhere('cpf', $idOrCpf)
            ->first();

        return $this->response->setJSON([
            'data' => $clients
        ]);
    }
}