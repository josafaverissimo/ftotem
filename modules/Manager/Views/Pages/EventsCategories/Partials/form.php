<form class="container mytable__form-action" method="post" novalidate autocomplete="off">
    <div class="row row-cols-3 gy-1 gx-3">
        <div class="col-12">
            <label for="mytable__form-input-name" class="fs-5 w-100">
                Informe o nome da categoria do evento
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-name" name="name" type="text" class="form-control mask-alpha"
                       placeholder="e.g.: Casamento" required data-mask="alphaspaces">
                <span class="input-group-text">
                    <i class="bi bi-card-text"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-light w-100">Enviar dados</button>
        </div>
    </div>
</form>