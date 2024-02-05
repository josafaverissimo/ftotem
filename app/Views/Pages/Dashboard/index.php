<?= $this->extend('master') ?>

<?= $this->section('content') ?>
    <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 g-4 mt-lg-3">
            <div class="col col-lg-6 animate__animated animate__fadeInLeft">
                <a href="<?= route_to('users') ?>" class="card text-bg-dark">
                    <div class="card-header fw-bold">Usuários</div>
                    <div class="card-body">
                        <i class="bi bi-person-circle"></i>
                    </div>
                </a>
            </div>

            <div class="col col-lg-6 animate__animated animate__fadeInRight animate__faster">
                <a href="<?= route_to('clients') ?>" class="card text-bg-dark">
                    <div class="card-header fw-bold">Clientes</div>
                    <div class="card-body">
                        <i class="bi bi-people-fill"></i>
                    </div>
                </a>
            </div>

            <div class="col col-lg-6 animate__animated animate__fadeInLeft animate__fast">
                <a href="<?= route_to('events') ?>" class="card text-bg-dark">
                    <div class="card-header fw-bold">Eventos</div>
                    <div class="card-body">
                        <i class="bi bi-calendar-event-fill"></i>
                    </div>
                </a>
            </div>

            <div class="col col-lg-6 animate__animated animate__fadeInRight">
                <a href="<?= route_to('events.categories') ?>" class="card text-bg-dark">
                    <div class="card-header fw-bold">Categorias de Eventos</div>
                    <div class="card-body">
                        <i class="bi bi-list-task"></i>
                    </div>
                </a>
            </div>
        </div>
    </div>
<?= $this->endSection() ?>
