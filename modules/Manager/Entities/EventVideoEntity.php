<?php

namespace Modules\Manager\Entities;

use CodeIgniter\Entity\Entity;

class EventVideoEntity extends Entity
{
    public function __construct(?array $data = null)
    {
        parent::__construct($data);

        helper('masks');
    }

    protected $attributes = [
        'id' => null,
        'video' => null,
        'event_id' => null,
        'created_at' => null,
        'updated_at' => null,
        'deleted_at' => null
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [
        'id' => 'integer',
        'video' => 'string',
        'event_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => '?datetime',
        'deleted_at' => '?datetime'
    ];
}