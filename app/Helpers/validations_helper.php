<?php

function checkAlphaSpaces(string $value): bool
{
    return preg_match('/^[a-zA-ZÀ-ÿ ]+$/', $value) === 1;
}

function checkAlphaNumericUnderscore(string $value): bool
{
    return preg_match('/^[a-zA-ZÀ-ÿ_0-9]+$/', $value) === 1;
}

function validCpf(string $cpf): bool
{
    $cpfLength = strlen($cpf);
    if($cpfLength != 11) {
        return false;
    }

    $cpfArray = str_split($cpf);
    $digitsToVerify = array_splice($cpfArray, -2);

    $firstDigitMod = array_reduce($cpfArray, function($sum, $digit) {
        static $multiplier = 10;

        $sum += $digit * $multiplier;

        $multiplier--;

        return $sum;
    }, 0) % 11;
    $firstDigit = $firstDigitMod > 1 ? 11 - $firstDigitMod : 0;

    if($digitsToVerify[0] != $firstDigit) {
        return false;
    }

    $cpfArray[] = $firstDigit;

    $secondDigitMod = array_reduce($cpfArray, function($sum, $digit) {
        static $multiplier = 11;

        $sum += $digit * $multiplier;

        $multiplier--;

        return $sum;
    }, 0) % 11;
    $secondDigit = $secondDigitMod > 1 ? 11 - $secondDigitMod : 0;

    return $digitsToVerify[1] == $secondDigit;
}