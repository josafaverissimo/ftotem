<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Clients extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'auto_increment' => true,
                'unsigned' => true
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'cpf' => [
                'type' => 'VARCHAR',
                'constraint' => 11,
                'unique' => true
            ],
            'cellphone' => [
                'type' => 'VARCHAR',
                'constraint' => 11,
                'unique' => true
            ],
            'cep' => [
                'type' => 'VARCHAR',
                'constraint' => 8
            ],
            'state' => [
                'type' => 'VARCHAR',
                'constraint' => 2
            ],
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'address' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'neighborhood' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'house_number' => [
                'type' => 'VARCHAR',
                'constraint' => 10
            ],
            'created_at' => [
                'type' => 'DATETIME'
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
            'deleted_at' => [
                'type' => 'DATETIME',
                'null' => true
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('ft_clients', false, [
            'ENGINE' => 'InnoDB'
        ]);
    }

    public function down()
    {
        $this->forge->dropTable('ft_clients');
    }
}
