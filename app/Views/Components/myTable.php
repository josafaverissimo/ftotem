<?php
/**
 * @var string $id
 * @var string $formViewPath
 * @var string[] $columns
 */
?>

<div id="<?= $id ?>" class="mytable__wrapper mytable__disabled">
    <div class="mytable__spinner">
        <div class="spinner-border" role="status"></div>
    </div>

    <div class="mytable__actions container-fluid">
        <div class="btn-group btn-group-sm align-self-end" role="group">
            <button type="button" class="btn btn-light" data-bs-toggle="modal"
                    data-bs-target="#mytable__form-modal">
                Adicionar
            </button>
            <button type="button" class="btn btn-light">Editar</button>
            <button type="button" class="btn btn-light">Excluir</button>
        </div>

        <div class="mytable__pagination__wrapper"></div>

        <div class="mytable__actions__search">
            <label for="mytable__actions__search" role="button">
                <i class="bi bi-search"></i>
            </label>
            <input id="mytable__actions__search" type="text">
            <i class="bi bi-x mytable__action__search-clear" role="button"></i>
        </div>
    </div>

    <div class="mytable">
        <table class="table table-striped table-hover shadow animate__animated animate__pulse">
            <thead>
                <tr>
                    <?php foreach($columns as $columName): ?>
                        <th><?= $columName ?></th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center" colspan="<?= count($columns) ?>">Nenhum dado encontrado</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="mytable__pagination__wrapper d-flex justify-content-end"></div>

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
</div>
