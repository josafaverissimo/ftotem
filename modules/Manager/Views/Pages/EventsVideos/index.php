<?= $this->extend('\Modules\Manager\Views\master') ?>

<?= $this->section('content') ?>
    <div class="events-videos-wrapper">
        <div class="events-videos-wrapper__select-event">
            <div>
                <label for="mytable__form-input-state" class="fs-5 w-100">
                    Selecione o evento
                </label>
                <div id="myselect-event" class="myselect">
                    <select name="state"></select>

                    <div class="input-group input-group-lg">
                        <input id="mytable__form-input-state" type="text" class="form-control" required readonly
                            placeholder="e.g.: aniversário">
                        <span class="input-group-text">
                            <i class="bi bi-calendar-event-fill"></i>
                        </span>
                    </div>

                    <div class="myselect__list">
                        <label>
                            <i class="bi bi-search icon"></i>
                            <input type="search">
                            <i class="bi bi-arrow-down-up icon order"></i>
                        </label>

                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="events-videos-wrapper__videos">
            <p class="h3 d-none animate__animated animate__fadeIn text-center">Não há vídeos gravados</p>

            <div class="videos-container"></div>
        </div>
    </div>
<?= $this->endSection() ?>

<?= $this->section('modal') ?>
<div class="modal fade" id="confirm-delete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Você quer mesmo deletar este vídeo?

                <div class="modal__video-container"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger delete">Sim, eu quero deletar esse vídeo</button>
            </div>
        </div>
    </div>
</div>
<?php $this->endSection() ?>
