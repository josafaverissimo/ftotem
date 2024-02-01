<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;

class EventCategoryEntity extends Entity
{
    public function __construct(?array $data = null)
    {
        parent::__construct($data);

        helper('masks');
    }

    protected $attributes = [
        'id' => null,
        'name' => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [
        'id' => 'integer',
        'name' => 'string',
        'created_at' => 'datetime',
        'updated_at' => '?datetime',
        'deleted_at' => '?datetime'
    ];

    public function setName(string $name): EventCategoryEntity
    {
        $this->attributes['name'] = removeSpaces(mb_convert_case($name, MB_CASE_LOWER));

        return $this;
    }
}