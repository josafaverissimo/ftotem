<?php

namespace Modules\Manager\Entities;

use CodeIgniter\Entity\Entity;

class UserEntity extends Entity
{
    public function __construct(?array $data = null)
    {
        parent::__construct($data);

        helper('masks');
    }

    protected $attributes = [
        'id' => null,
        'name' => null,
        'username' => null,
        'cpf' => null,
        'cellphone' => null,
        'password' => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [
        'id' => 'integer',
        'name' => 'string',
        'username' => 'string',
        'cpf' => 'string',
        'cellphone' => 'string',
        'password' => 'string',
        'created_at' => 'datetime',
        'updated_at' => '?datetime',
        'deleted_at' => '?datetime'
    ];

    public function setName(string $name): UserEntity
    {
        $this->attributes['name'] = removeSpaces(mb_convert_case($name, MB_CASE_LOWER));

        return $this;
    }

    public function setUsername(string $username): UserEntity
    {
        $this->attributes['username'] = mb_convert_case($username, MB_CASE_LOWER);

        return $this;
    }
}
