<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;

class ClientEntity extends Entity
{
    protected $attributes = [
        'id' => null,
        'name' => null,
        'cpf' => null,
        'cellphone' => null,
        'cep' => null,
        'state' => null,
        'city' => null,
        'address' => null,
        'neighborhood' => null,
        'house_number' => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [
        'id' => 'integer',
        'name' => 'string',
        'cpf' => 'string',
        'cellphone' => 'string',
        'cep' => 'string',
        'state' => 'string',
        'city' => 'string',
        'address' => 'string',
        'neighborhood' => 'string',
        'house_number' => 'string',
        'created_at' => 'datetime',
        'updated_at' => '?datetime',
        'deleted_at' => '?datetime'
    ];
}