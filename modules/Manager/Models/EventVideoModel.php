<?php

namespace Modules\Manager\Models;

use CodeIgniter\Model;

class EventVideoModel extends Model
{
    protected $table            = 'ft_events_videos';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = '\Modules\Manager\Entities\EventVideoEntity';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = ['video', 'event_id'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'video' => 'required|max_length[300]',
        'event_id' => 'required|numeric'
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function getVideosWithEventByEventId(int $eventId): array
    {
        return $this->select('ft_events_videos.id, ft_events_videos.video, ft_events_videos.created_at,
            ft_events.id event_id, ft_events.name event, ft_events_categories.name category')
            ->join('ft_events', 'ft_events.id = ft_events_videos.event_id')
            ->join('ft_events_categories', 'ft_events_categories.id = ft_events.event_category_id')
            ->where('ft_events.id', $eventId)
            ->orderBy('id', 'desc')
            ->findAll();
    }
}