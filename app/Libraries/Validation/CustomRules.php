<?php

namespace App\Libraries\Validation;

class CustomRules
{
    public function __construct() {
        helper('validations');
    }

    public function custom_alpha_spaces(string $value): bool
    {
        return checkAlphaSpaces($value);
    }

    public function custom_alpha_numeric_underscore(string $value): bool
    {
        return checkAlphaNumericUnderscore($value);
    }

    public function valid_cpf(string $cpf): bool
    {
        return validCpf($cpf);
    }
}