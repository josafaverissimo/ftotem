<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="<?= base_url('assets/imgs/favicon.ico') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/font/bootstrap-icons.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/animate.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/login/styles.css') ?>">
    <title>Login</title>
</head>
<body>
    <main>
        <div class="container">
            <div class="d-flex justify-content-center align-items-center mt-5">
                <div class="card-wrapper">
                    <h1 class="h3 text-center fw-light">Bem-vindo</h1>

                    <img src="<?= base_url('assets/imgs/logo2.png') ?>">

                    <form action="<?= route_to('login.doLogin') ?>" autocomplete="off">
                        <div class="col">
                            <label for="username">Usuário</label>
                            <input name="username" id="username" class="form-control form-control-lg" type="text"
                                placeholder="e.g.: osias.vasi" data-mask="alphanumericdashsdots">
                            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
                        </div>

                        <div class="col">
                            <label for="password">Senha</label>
                            <input name="password" id="password" class="form-control form-control-lg" type="password"
                                   placeholder="e.g.: *******">
                            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <script>const baseUrl = "<?= base_url() ?>"</script>

    <script src="<?= base_url('assets/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?= base_url('assets/axios/axios.min.js') ?>"></script>
    <script src="<?= base_url('assets/js/imask.js') ?>"></script>
    <script src="<?= base_url('assets/js/utils/requester.js') ?>" type="module"></script>
    <script src="<?= base_url('assets/js/scripts.js') ?>"></script>
    <script src="<?= base_url('assets/js/utils/toastify.js') ?>"></script>
    <script src="<?= base_url('assets/js/login/scripts.js') ?>" type="module"></script>
</body>
</html>