<?php

function generateCpfDigits(string $cpf): false|string
{
    if(strlen($cpf) != 9) {
        return false;
    }

    $cpfArray = str_split($cpf);

    $firstDigitMod = array_reduce($cpfArray, function($sum, $digit) {
        static $multiplier = 10;

        $sum += $digit * $multiplier;

        $multiplier--;

        return $sum;
    }, 0) % 11;
    $firstDigit = $firstDigitMod > 1 ? 11 - $firstDigitMod : 0;

    $cpfArray[] = $firstDigit;

    $secondDigitMod = array_reduce($cpfArray, function($sum, $digit) {
        static $multiplier = 11;

        $sum += $digit * $multiplier;

        $multiplier--;

        return $sum;
    }, 0) % 11;
    $secondDigit = $secondDigitMod > 1 ? 11 - $secondDigitMod : 0;

    return "{$firstDigit}{$secondDigit}";
}