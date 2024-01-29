<?php

namespace App\Libraries\MyTable;

use CodeIgniter\Entity\Entity;

class TableData {
    /** @var string[] */
    private array $head;
    /** @var string[]|Entity */
    private array $body;
    /** @var callable[] */
    private array $formattersByField;

    public function setHead(array $head): void
    {
        $this->head = $head;
    }

    /**
     * @param string[]|Entity[] $body
     * @return void
     */
    public function setBody(array $body): void
    {
        $this->body = array_map(function($row) {
            foreach($this->head as $columnName) {
                $cell = $row[$columnName];

                if(in_array($columnName, array_keys($this->formattersByField))) {
                    $row[$columnName] = $this->formattersByField[$columnName]($cell);
                }
            }

            return $row;
        }, $body);
    }

    public function getHead(): array
    {
        return $this->head;
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function setFormatter(string $name, callable $callable): void
    {
        $this->formattersByField[$name] = $callable;
    }

    public function setFormatters(array $callables): void
    {
        $this->formattersByField = $callables;
    }

    public function getFormatters(): array
    {
        return $this->formattersByField;
    }
}