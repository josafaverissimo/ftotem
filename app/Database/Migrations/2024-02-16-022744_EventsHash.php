<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EventsHash extends Migration
{
    public function up()
    {
        $fields = [
            'hash' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
                'after' => 'id',
                'unique' => true,
                'null' => false
            ],
        ];

        $this->forge->addColumn('ft_events', $fields);
    }

    public function down()
    {
        $this->forge->dropColumn('ft_events', 'hash');
    }
}
