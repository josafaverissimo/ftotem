<?php

/**
 * @var array $styles
 * @var array $scripts
 * @var string $tableTitle
 * @var string $myTableModalComponent
 * @var string $myTableComponent
 */

?>

<?= $this->extend('master') ?>

<?= $this->section('css') ?>
    <?php foreach($styles as $styleHref): ?>
        <link rel="stylesheet" href="<?= base_url($styleHref) ?>">
    <?php endforeach; ?>
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <?php foreach($scripts as $script): ?>
        <script
            src="<?= base_url($script['src']) ?>"
            <?= isset($script['type']) ? "type='{$script['type']}'" : '' ?>
        ></script>
    <?php endforeach; ?>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <h1 class="h2 fw-bold border-bottom animate__animated animate__fadeInLeft"><?= $tableTitle ?></h1>

<?= $myTableComponent ?>

<?= $this->endSection() ?>

<?= $this->section('modal') ?>
    <?= $myTableModalComponent ?>
<?= $this->endSection() ?>

