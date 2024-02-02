<form class="container mytable__form-action" method="post" novalidate autocomplete="off">
    <div class="row row-cols-2 gy-1 gx-3">
        <div class="col-12">
            <label for="mytable__form-input-name" class="fs-5 w-100">
                Informe o nome e sobrenome
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-name" name="name" type="text" class="form-control mask-alpha"
                       placeholder="e.g.: José Everaldo" required data-mask="alphaspaces">
                <span class="input-group-text">
                    <i class="bi bi-person-lines-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-username" class="fs-5 w-100">
                Digite o login desejado
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-username" name="username" type="text" class="form-control"
                       placeholder="e.g.: joseeveraldo123" required data-mask="alphanumericdashsdots">
                <span class="input-group-text">
                    <i class="bi bi-person-circle"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-password" class="fs-5 w-100">
                Digite a senha
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-password" name="password" type="password" class="form-control"
                       placeholder="e.g.: ********" required>
                <button class="btn btn-secondary" type="button">
                    <i class="bi bi-eye-slash-fill"></i>
                </button>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-cpf" class="fs-5 w-100">
                Informe o CPF
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-cpf" name="cpf" type="text" class="form-control" data-mask="cpf"
                       placeholder="e.g.: 123.456.789-09" required>
                <span class="input-group-text">
                    <i class="bi bi-file-person-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-cellphone" class="fs-5 w-100">
                Informe o número de celular
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-cellphone" name="cellphone" type="text" class="form-control"
                       placeholder="e.g.: (82) 9 0101-0202" required data-mask="cellphone">
                <span class="input-group-text">
                    <i class="bi bi-telephone-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-light w-100">Enviar dados</button>
        </div>
    </div>
</form>