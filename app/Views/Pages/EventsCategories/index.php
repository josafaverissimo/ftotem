<?php

/**
 * @var array $tableColumns
 * @var string $tableTitle
 */

?>

<?= $this->extend('master') ?>

<?= $this->section('css') ?>
<link rel="stylesheet" href="<?= base_url('assets/css/myTable/styles.css') ?>">
<?= $this->endSection() ?>

<?= $this->section('js') ?>
<script src="<?= base_url('assets/js/myTable/main.js') ?>" type="module"></script>
<script src="<?= base_url('assets/js/eventsCategories/main.js') ?>" type="module"></script>
<script src="<?= base_url('assets/js/eventsCategories/scripts.js') ?>" type="module"></script>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<h1 class="h2 fw-bold border-bottom animate__animated animate__fadeInLeft"><?= $tableTitle ?></h1>

<?= newView('Components/myTable', [
    'id' => 'eventsCategoriesTable',
    'formViewPath' => 'Pages/EventsCategories/Partials/form',
    'columns' => $tableColumns
]) ?>
<?= $this->endSection() ?>
