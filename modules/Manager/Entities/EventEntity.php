<?php

namespace Modules\Manager\Entities;

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
        'hash' => null,
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
        'hash' => 'string',
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

    public function setActive(string $active): EventEntity
    {
        $this->attributes['active'] = $active === 'on' || $active === 'T' ? 'T' : 'F';

        return $this;
    }

    public function getActive(): string
    {
        return empty($this->attributes['active']) ? 'F' : 'T';
    }
}