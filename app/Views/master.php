<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/font/bootstrap-icons.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/animate.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/styles.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/sidebar.css') ?>">

    <?= $this->renderSection('css') ?>

    <title><?= $title ?? VIEW_DEFAULT_TITLE ?></title>
</head>
<body>
    <div class="d-flex">
        <?= $this->include('Partials/sidebar') ?>

        <main class="d-flex flex-column flex-grow-1 align-items-center min-vh-100">
            <div class="w-100 d-flex justify-content-center animate__animated animate__fadeInDown">
                <?= $this->include('Partials/header') ?>
            </div>

            <div class="main-content px-5 pt-3 h-100 animate__animated animate__fadeIn">
                <?= $this->renderSection('content') ?>
            </div>
        </main>
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