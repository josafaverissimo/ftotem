<?php

namespace Modules\Manager\Entities;

use CodeIgniter\Entity\Entity;

class ClientEntity extends Entity
{
    public function __construct(?array $data = null)
    {
        parent::__construct($data);

        helper('masks');
    }

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

    public function setName(string $name): ClientEntity
    {
        $this->attributes['name'] = removeSpaces(mb_convert_case($name, MB_CASE_LOWER));

        return $this;
    }

    public function setCity(string $city): ClientEntity
    {
        $this->attributes['city'] = removeSpaces(mb_convert_case($city, MB_CASE_LOWER));

        return $this;
    }

    public function setAddress(string $address): ClientEntity
    {
        $this->attributes['address'] = removeSpaces(mb_convert_case($address, MB_CASE_LOWER));

        return $this;
    }

    public function setNeighborhood(string $neighborhood): ClientEntity
    {
        $this->attributes['neighborhood'] = removeSpaces(mb_convert_case($neighborhood, MB_CASE_LOWER));

        return $this;
    }

    public function setHouseNumber(string $houseNumber): ClientEntity
    {
        $this->attributes['house_number'] = mb_convert_case($houseNumber, MB_CASE_LOWER);

        return $this;
    }
}