<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Events extends Migration
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
            'background' => [
                'type' => 'VARCHAR',
                'constraint' => 300
            ],
            'active' => [
                'type' => 'ENUM',
                'constraint' => ['T', 'F'],
                'default' => 'T'
            ],
            'events_categories_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true
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
        $this->forge->addForeignKey('events_categories_id', 'ft_events_categories', 'id');
        $this->forge->createTable('ft_events');
    }

    public function down()
    {
        $this->forge->dropTable('ft_events');
    }
}
