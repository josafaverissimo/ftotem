<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EventsVideos extends Migration
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
            'video' => [
                'type' => 'VARCHAR',
                'constraint' => 300,
                'unique' => true
            ],
            'event_id' => [
                'type' => 'int',
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
        $this->forge->addForeignKey('event_id', 'ft_events', 'id');
        $this->forge->createTable('ft_events_videos');
    }

    public function down()
    {
        $this->forge->dropTable('ft_events_videos');
    }
}
