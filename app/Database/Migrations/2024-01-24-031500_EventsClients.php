<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EventsClients extends Migration
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
            'event_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true
            ],
            'client_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('event_id', 'ft_events', 'id');
        $this->forge->addForeignKey('client_id', 'ft_clients', 'id');
        $this->forge->createTable('ft_events_clients');
    }

    public function down()
    {
        $this->forge->dropTable('ft_events_clients');
    }
}
