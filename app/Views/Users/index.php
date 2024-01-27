<?= $this->extend('master') ?>

<?= $this->section('css') ?>
    <link rel="stylesheet" href="<?= base_url('assets/css/myTable/styles.css') ?>">
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <script src="<?= base_url('assets/js/myTable/main.js') ?>" type="module"></script>
    <script src="<?= base_url('assets/js/users/main.js') ?>" type="module"></script>
<script src="<?= base_url('assets/js/users/scripts.js') ?>" type="module"></script>
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<h1 class="display-6 fw-bold border-bottom animate__animated animate__fadeInLeft">Tabela de usuários</h1>

<?= newView('Components/myTable', [
        'id' => 'usersTable',
        'formViewPath' => 'Users/Partials/form'
]) ?>
<?= $this->endSection() ?>
