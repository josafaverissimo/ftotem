<?php

    /**
     * @var string $modalHeader
     * @var string $formViewPath
     */
?>

<div class="modal animate__animated animate__fadeInDown animate__fast fade shadow-none"
     id="mytable__form-modal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h1 class="modal-title fs-5"><?= $modalHeader ?></h1>
                    <span class="d-block fst-italic">Pressione esc ou clique nos botões para fechar</span>
                </div>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h1 class="display-3 fw-bold text-center mytable__form-modal-title">Cadastrar usuário</h1>

                <?= $this->include($formViewPath) ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>