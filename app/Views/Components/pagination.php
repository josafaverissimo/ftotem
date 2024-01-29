<?php

use CodeIgniter\Pager\PagerRenderer;

/**
 * @var PagerRenderer $pager
 */

$pager->setSurroundCount(2);
?>

<nav>
    <ul class="mytable__pagination">
        <?php if ($pager->hasPrevious()) : ?>
            <li>
                <a href="<?= $pager->getPrevious() ?>" class="mytable__pagination__page-item">
                    <i class="bi bi-chevron-double-left"></i>
                </a>
            </li>
            <li>
                <a href="<?= $pager->getFirst() ?>" class="mytable__pagination__page-item">
                    <span>1</span>
                </a>
            </li>
            <li>
                <i class="bi bi-three-dots mytable__pagination__page-item"></i>
            </li>
        <?php endif ?>

        <?php foreach ($pager->links() as $link) : ?>
            <li class="mytable__pagination__page-item <?= $link['active'] ? 'mytable__pagination__active' : '' ?>">
                <a href="<?= $link['uri'] ?>" class="mytable__pagination__page-item">
                    <?= $link['title'] ?>
                </a>
            </li>
        <?php endforeach ?>

        <?php if ($pager->hasNext()) : ?>
            <li>
                <i class="bi bi-three-dots mytable__pagination__page-item"></i>
            </li>
            <li>
                <a href="<?= $pager->getLast() ?>" class="mytable__pagination__page-item">
                    <span aria-hidden="true"><?= $pager->getPageCount() ?></span>
                </a>
            </li>
            <li>
                <a href="<?= $pager->getNext() ?>" class="mytable__pagination__page-item">
                    <i class="bi bi-chevron-double-right"></i>
                </a>
            </li>
        <?php endif ?>
    </ul>
</nav>
