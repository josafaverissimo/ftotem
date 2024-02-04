<?php

namespace App\Entities;

use Codeigniter\Entity\Entity;

class EventClientEntity extends Entity
{
    protected $attributes = [
        'id' => null,
        'event_id' => null,
        'client_id' => null
    ];
    protected $datamap = [];
    protected $dates   = [];
    protected $casts   = [
        'id' => 'integer',
        'event_id' => 'integer',
        'client_id' => 'integer'
    ];
}
