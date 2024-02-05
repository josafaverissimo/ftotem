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

<?= $this->section('js') ?>
    <?php foreach($scripts as $script): ?>
        <script
            src="<?= base_url($script['src']) ?>"
            <?= isset($script['type']) ? "type='{$script['type']}'" : '' ?>
        ></script>
    <?php endforeach; ?>
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<?= $myTableComponent ?>

<?= $this->endSection() ?>

<?= $this->section('modal') ?>
    <?= $myTableModalComponent ?>
<?= $this->endSection() ?>

