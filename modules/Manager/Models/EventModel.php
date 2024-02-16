<?php

namespace Modules\Manager\Models;

use CodeIgniter\Model;

class EventModel extends Model
{
    protected $table            = 'ft_events';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = '\Modules\Manager\Entities\EventEntity';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'name',
        'background',
        'active',
        'event_category_id'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'name' => 'required|custom_alpha_spaces|max_length[255]|is_unique[ft_events.name]',
        'background' => 'required|max_length[255]',
        'active' => 'permit_empty|in_list[T,F]',
        'event_category_id' => 'required|numeric'
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = ['setHash'];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function setHash(array $data): array
    {
        $data['data']['hash'] = md5(uniqid() . time());

        return $data;
    }
}