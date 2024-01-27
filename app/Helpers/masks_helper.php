<?php

function removeCpfMask(string $cpf): string
{
    return str_replace(['.', '-'], '', $cpf);
}

function removeCellphoneMask(string $cellphone): string
{
    return str_replace(['(', ')', ' ', '-'], '', $cellphone);
}