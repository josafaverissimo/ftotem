<?php

function checkAlphaSpaces(string $value): bool
{
    return preg_match('/^[a-zA-ZÀ-ÿ ]+$/', $value) === 1;
}

function checkAlphaNumericDashsDot(string $value): bool
{
    return preg_match('/^[a-zA-ZÀ-ÿ_0-9.\-]+$/', $value) === 1;
}

function validCpf(string $cpf): bool
{
    $cpf = str_replace(['.', '-'], '', $cpf);
    if(strlen($cpf) != 11) {
        return false;
    }

    if(!function_exists('generateCpfDigits')) {
        helper('generators');
    }

    $digitsToVerify = substr($cpf, -2);

    return $digitsToVerify === generateCpfDigits(substr($cpf, 0, 9));
}

function validCep(string $cep): bool
{
    return preg_match('/\d{5}-\d{3}/', $cep) === 1;
}

function checkAlphaNumericSpacesDotComma(string $value): bool
{
    return preg_match('/^[a-zA-ZÀ-ÿ0-9 .,]+$/', $value) === 1;
}