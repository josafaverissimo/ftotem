<form class="container mytable__form-action" method="post" novalidate autocomplete="off">
    <div class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 gy-1 gx-3">
        <div class="col">
            <div class="row row-cols-1">
                <div class="d-flex gap-5">
                    <div>
                        <label for="mytable__form-input-name" class="fs-5 w-100">
                            Informe o nome do evento
                        </label>
                        <div class="input-group input-group-lg">
                            <input id="mytable__form-input-name" name="name" type="text" class="form-control mask-alpha"
                                   placeholder="e.g.: Festa ReLive" required data-mask="alphaspaces">
                            <span class="input-group-text">
                                <i class="bi bi-person-lines-fill"></i>
                            </span>
                        </div>
                        <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
                    </div>

                    <div class="d-flex flex-column justify-content-between h-100">
                        <label for="mytable__form-input-active" class="fs-5 m-0">Deseja ativar?</label>
                        <label class="switch">
                            <input id="mytable__form-input-active" name="active" type="checkbox" class="switch-input">
                            <span class="switch-slider"></span>
                        </label>
                        <p class="form-text mytable__form-action-error-message opacity-0">O campo é obrigatório</p>
                    </div>
                </div>

                <div class="col">
                    <label for="mytable__form-input-event-category-id" class="fs-5 w-100">
                        Selecione a categoria
                    </label>
                    <div id="mytable__form-myselect-event-category-id" class="myselect">
                        <select class="visually-hidden" name="event_category_id"></select>

                        <div class="input-group input-group-lg">
                            <input id="mytable__form-input-event-category-id" type="text" class="form-control"
                                   placeholder="e.g.: Casamento" required data-mask="alphaspaces">
                            <span class="input-group-text">
                            <i class="bi bi-globe-americas"></i>
                        </div>

                        <div class="myselect__list"></div>
                    </div>
                    <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div id="file-input__background" class="file-input">
                <div class="loading__spinner">
                    <div class="spinner-border" role="status"></div>
                </div>

                <label>
                    <span class="fs-5">Selecione uma imagem</span>
                    <input id="mytable__form-input-background" type="file" name="background"
                           accept="image/png, image/jpeg" data-file-type="image">
                </label>

                <div class="file-input__selected-image p-3">
                    <img src="<?= base_url('assets/imgs/no-image.jpeg') ?>" loading="lazy"
                         alt="selected image">
                    <span class="mt-3 filename">Nenhuma imagem foi selecionada</span>
                    <span class="filesize d-block"></span>
                </div>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col w-100 mt-3">
            <button type="submit" class="btn btn-light w-100">Enviar dados</button>
        </div>
    </div>
</form>