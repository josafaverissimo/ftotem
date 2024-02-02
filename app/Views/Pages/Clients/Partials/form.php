<form class="container mytable__form-action" method="post" novalidate autocomplete="off">
    <div class="row row-cols-3 gy-1 gx-3">
        <div class="col-12">
            <label for="mytable__form-input-name" class="fs-5 w-100">
                Informe o nome e sobrenome
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-name" name="name" type="text" class="form-control mask-alpha"
                       placeholder="e.g.: Osias Vasi Ferjmo" required data-mask="alphaspaces">
                <span class="input-group-text">
                    <i class="bi bi-person-lines-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-6">
            <label for="mytable__form-input-cpf" class="fs-5 w-100">
                Digite o CPF
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-cpf" name="cpf" type="text" class="form-control"
                       placeholder="e.g.: 123.456.789-09" required data-mask="cpf">
                <span class="input-group-text">
                    <i class="bi bi-person-circle"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-6">
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

        <div class="col">
            <label for="mytable__form-input-cep" class="fs-5 w-100">
                Informe o CEP
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-cep" name="cep" type="text" class="form-control"
                       placeholder="e.g.: 57035-900" required data-mask="cep">
                <button class="btn btn-secondary" type="button">
                    <i class="bi bi-search"></i>
                </button>

            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-state" class="fs-5 w-100">
                Informe o estado
            </label>
            <div id="mytable__form-myselect-state" class="myselect">
                <select class="visually-hidden" name="state"></select>

                <div class="input-group input-group-lg">
                    <input id="mytable__form-input-state" type="text" class="form-control"
                           placeholder="e.g.: Alagoas" required data-mask="alphaspaces">
                    <span class="input-group-text">
                        <i class="bi bi-globe-americas"></i>
                    </span>
                </div>

                <div class="myselect__list"></div>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col">
            <label for="mytable__form-input-city" class="fs-5 w-100">
                Informe a cidade
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-city" name="city" type="text" class="form-control"
                       placeholder="e.g.: Maceió" required data-mask="alphaspaces">
                <span class="input-group-text">
                    <i class="bi bi-buildings-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-12">
            <label for="mytable__form-input-address" class="fs-5 w-100">
                Digite o logradouro
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-address" name="address" type="text" class="form-control"
                       placeholder="e.g.: Avenida Álvaro Otacílio" required data-mask="alhpanumericspacesdots">
                <span class="input-group-text">
                    <i class="bi bi-signpost-split-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-6">
            <label for="mytable__form-input-neighborhood" class="fs-5 w-100">
                Informe o bairro
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-neighborhood" name="neighborhood" type="text" class="form-control"
                       placeholder="e.g.: Ponta Verde" required data-mask="alphaspaces">
                <span class="input-group-text">
                    <i class="bi bi-houses-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-6">
            <label for="mytable__form-input-house_number" class="fs-5 w-100">
                Digite o número da casa
            </label>
            <div class="input-group input-group-lg">
                <input id="mytable__form-input-house_number" name="house_number" type="text" class="form-control"
                       placeholder="e.g.: 15" required data-mask="alphanumeric">
                <span class="input-group-text">
                    <i class="bi bi-house-fill"></i>
                </span>
            </div>
            <p class="form-text mytable__form-action-error-message">O campo é obrigatório</p>
        </div>

        <div class="col-12">
            <button type="submit" class="btn btn-light w-100">Enviar dados</button>
        </div>
    </div>
</form>