<?php

function applyCpfMask(string $cpf): string
{
    return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $cpf);
}

function removeCpfMask(string $cpf): string
{
    return str_replace(['.', '-'], '', $cpf);
}

function applyCellphoneMask(string $cellphone): string
{
    return preg_replace('/(\d{2})(\d)(\d{4})(\d{4})/', '($1) $2 $3-$4', $cellphone);
}

function removeCellphoneMask(string $cellphone): string
{
    return str_replace(['(', ')', ' ', '-'], '', $cellphone);
}

function applyDateBrFormat(string $date): string
{
    return date('d/m/Y H:i:s', strtotime($date));
}

function applyCepMask(string $cep): string
{
    return preg_replace('/(\d{5})(\d{3})/', '$1-$2', $cep);
}

function removeSpaces(string $string): string
{
    return trim(preg_replace('/ +/', ' ', $string));
}

function capitalize(string $string): string
{
    return mb_convert_case($string, MB_CASE_TITLE);
}
