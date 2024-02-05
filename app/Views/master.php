<?php
    /** @var ?array $styles */
?>

<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/font/bootstrap-icons.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/animate.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/styles.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/sidebar.css') ?>">

    <?php if(!empty($styles)): ?>
        <?php foreach($styles as $styleHref): ?>
            <link rel="stylesheet" href="<?= base_url($styleHref) ?>">
        <?php endforeach; ?>
    <?php endif; ?>

    <title><?= $title ?? VIEW_DEFAULT_TITLE ?></title>
</head>
<body>
    <div class="d-flex">
        <?= $this->include('Partials/sidebar') ?>

        <main class="d-flex flex-column flex-grow-1 align-items-center">
            <?= $this->include('Partials/header') ?>

            <div class="main-content px-sm-5 pt-3 h-100 animate__animated animate__fadeIn">
                <?= $this->renderSection('content') ?>
            </div>
        </main>
    </div>

    <?= $this->renderSection('modal') ?>

    <div class="modal fade modal-xl" id="generic-modal" tabindex="-1" data-bs-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
            </div>
        </div>
    </div>

    <script>
        const baseUrl = "<?= base_url() ?>"
    </script>

    <script src="<?= base_url('assets/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?= base_url('assets/axios/axios.min.js') ?>"></script>
    <script src="<?= base_url('assets/js/imask.js') ?>"></script>
    <script src="<?= base_url('assets/js/scripts.js') ?>"></script>
    <script src="<?= base_url('assets/js/utils/requester.js') ?>" type="module"></script>
    <script src="<?= base_url('assets/js/utils/toastify.js') ?>"></script>
    <script src="<?= base_url('assets/js/sidebar.js') ?>" type="module"></script>

    <?= $this->renderSection('js') ?>
</body>
</html>