<?php
/**
 * @var string $id
 * @var string $formViewPath
 * @var string[] $columns
 */
?>

<div id="<?= $id ?>" class="mytable__wrapper">
    <div class="loading__spinner">
        <div class="spinner-border" role="status"></div>
    </div>

    <div class="mytable__actions container-fluid">
        <div class="btn-group btn-group-sm" role="group">
            <button id="mytable__actions-create" type="button" class="btn btn-light" data-bs-toggle="modal"
                    data-bs-target="#mytable__form-modal">
                Adicionar
            </button>
            <button id="mytable__actions-edit" type="button" class="btn btn-light">
                Editar
            </button>
            <button id="mytable__actions-delete" type="button" class="btn btn-light">Excluir</button>
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

    <div class="mytable table-responsive shadow animate__animated animate__fadeIn">
        <table class="table table-striped table-hover shadow">
            <thead>
                <tr>
                    <?php foreach($columns as $columName): ?>
                        <th data-original-name="<?= $columName ?>">
                            <?= esc(lang("Words.{$columName}")) ?>
                        </th>
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
</div>
