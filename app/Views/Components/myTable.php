<?php
/**
 * @var string $id
 * @var string $formViewPath
 */
?>

<div id="<?= $id ?>" class="mytable__wrapper">
    <div class="mytabe__actions btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-light" data-bs-toggle="modal"
                data-bs-target="#mytable__form-modal">
            Adicionar
        </button>
        <button type="button" class="btn btn-light">Editar</button>
        <button type="button" class="btn btn-light">Excluir</button>
    </div>

    <div class="modal animate__animated animate__fadeInDown animate__fast fade shadow-none" id="mytable__form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h1 class="modal-title fs-5">Formulário de Usuários</h1>
                        <span class="d-block fst-italic">Pressione esc ou clique nos botões para fechar</span>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h1 class="display-3 fw-bold text-center">Cadastrar usuário</h1>

                    <?= $this->include($formViewPath) ?>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <table class="table table-striped table-hover shadow mytable">
        <thead>
            <tr>
                <th class="d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <span>ID</span>
                </th>
                <th>NOME</th>
                <th>CPF</th>
                <th>TELEFONE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" value="">
                    <span>1</span>
                </td>
                <td>Josafa</td>
                <td>128.291.404-94</td>
                <td>(82) 9 8185-2058</td>
            </tr>
            <tr>
                <td class="d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" value="">
                    <span>1</span>
                </td>
                <td>Josafa</td>
                <td>128.291.404-94</td>
                <td>(82) 9 8185-2058</td>
            </tr>
        </tbody>
    </table>
</div>
