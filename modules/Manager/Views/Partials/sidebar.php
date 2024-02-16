<aside id="sidebar">
    <div class="d-flex flex-column align-items-center">
        <button id="sidebar__toggle-btn" type="button">
            <i class="bi bi-grid"></i>
            <span class="sidebar__logo">ReLive</span>
        </button>
    </div>

    <ul class="sidebar__nav">
        <li class="sidebar__nav-item">
            <a href="<?=  url_to('dashboard') ?>" class="sidebar__nav-link">
                <i class="bi bi-speedometer"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="sidebar__nav-item">
            <a href="<?=  url_to('users') ?>" class="sidebar__nav-link">
                <i class="bi bi-person-circle"></i>
                <span>Usuários</span>
            </a>
        </li>
        <li class="sidebar__nav-item">
            <a href="<?= url_to('clients') ?>" class="sidebar__nav-link">
                <i class="bi bi-people-fill"></i>
                <span>Clientes</span>
            </a>
        </li>
        <li class="sidebar__nav-item">
            <a href="<?= url_to('events') ?>" class="sidebar__nav-link">
                <i class="bi bi-calendar-event-fill"></i>
                <span>Eventos</span>
            </a>

            <button class="collapsed sidebar__toggle-dropdown sidebar__has-dropdown" data-bs-toggle="collapse"
                    data-bs-target="#sidebar__events-dropdown" type="button">
                <i class="bi bi-arrow-bar-down"></i>
            </button>

            <ul id="sidebar__events-dropdown" class="sidebar__dropdown collapse list-unstyled">
                <li class="sidebar__nav-item">
                    <a href="<?= url_to('events.categories') ?>" class="sidebar__nav-link">Categorias</a>
                </li>
                <li class="sidebar__nav-item">
                    <a href="<?= url_to('events.videos') ?>" class="sidebar__nav-link">Vídeos</a>
                </li>
            </ul>
        </li>
    </ul>
    <div class="sidebar__footer">
        <a href="<?= url_to('login.doLogout') ?>" class="sidebar__nav-link">
            <i class="bi bi-box-arrow-left"></i>
            <span>Logout</span>
        </a>
    </div>
</aside>