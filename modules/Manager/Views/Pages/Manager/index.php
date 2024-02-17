<?php

/**
 * @var array $styles
 * @var array $scripts
 * @var string $tableTitle
 * @var string $myTableModalComponent
 * @var string $myTableComponent
 */

?>

<?= $this->extend('\Modules\Manager\Views\master') ?>

<?= $this->section('content') ?>

<?= $myTableComponent ?>

<?= $this->endSection() ?>

<?= $this->section('modal') ?>
    <?= $myTableModalComponent ?>
<?= $this->endSection() ?>

