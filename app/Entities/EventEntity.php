<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;

class EventEntity extends Entity
{
    public function __construct(?array $data = null)
    {
        parent::__construct($data);

        helper('masks');
    }

    protected $attributes = [
        'id' => null,
        'name' => null,
        'background' => null,
        'active' => null,
        'event_category_id' => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [
        'id' => 'integer',
        'name' => 'string',
        'background' => 'string',
        'active' => 'string',
        'event_category_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => '?datetime',
        'deleted_at' => '?datetime'
    ];

    public function setName(string $name): EventEntity
    {
        $this->attributes['name'] = removeSpaces(mb_convert_case($name, MB_CASE_LOWER));

        return $this;
    }
}