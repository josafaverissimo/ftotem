<?php

namespace Modules\Manager\Models;

use CodeIgniter\Model;

class ClientModel extends Model
{
    protected $table            = 'ft_clients';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = '\Modules\Manager\Entities\ClientEntity';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'name',
        'cpf',
        'cellphone',
        'cep',
        'state',
        'city',
        'address',
        'neighborhood',
        'house_number'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'name' => 'required|custom_alpha_spaces|max_length[255]',
        'cpf' => 'required|exact_length[14]|valid_cpf|is_unique[ft_clients.cpf]',
        'cellphone' => 'required|exact_length[16]|is_unique[ft_clients.cellphone]',
        'cep' => 'required|valid_cep|exact_length[9]',
        'state' => 'required|alpha|exact_length[2]',
        'city' => 'required|custom_alpha_spaces|max_length[255]',
        'address' => 'required|custom_alpha_numeric_spaces_dot_comma|max_length[255]',
        'neighborhood' => 'required|custom_alpha_spaces|max_length[255]',
        'house_number' => 'required|alpha_numeric|max_length[10]'
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
}