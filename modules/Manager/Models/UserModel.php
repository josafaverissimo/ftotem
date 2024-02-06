<?php

namespace Modules\Manager\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'ft_users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = '\Modules\Manager\Entities\UserEntity';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = ['name', 'username', 'cpf', 'cellphone', 'password'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'name' => 'required|custom_alpha_spaces|max_length[255]',
        'username' => 'required|custom_alpha_numeric_dashs_dot|max_length[255]|is_unique[ft_users.username]',
        'cpf' => 'required|exact_length[14]|valid_cpf|is_unique[ft_users.cpf]',
        'cellphone' => 'required|exact_length[16]|is_unique[ft_users.cellphone]',
        'password' => 'required|min_length[8]|max_length[255]'
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = ['hashPassword'];
    protected $afterInsert    = [];
    protected $beforeUpdate   = ['hashPassword'];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    protected function hashPassword(array $data): array
    {
        if(!isset($data['data']['password'])) {
            return $data;
        }

        $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT);

        return $data;
    }
}
