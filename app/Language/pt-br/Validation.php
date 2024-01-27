<?php

return [
	// Core Messages
	'noRuleSets'            => 'Nenhum conjunto de regras especificado na configuração de Validação.',
	'ruleNotFound'          => '{0} não é uma regra válida.',
	'groupNotFound'         => '{0} não é um grupo de regras de validação.',
	'groupNotArray'         => 'O grupo de regras {0} deve ser um array.',
	'invalidTemplate'       => '{0} não é um template de Validation válido.',

	// Rule Messages
    'custom_alpha_spaces'   => 'O campo pode conter apenas caracteres alfabéticos',
	'alpha'                 => 'O campo pode conter apenas caracteres alfabéticos',
	'alpha_dash'            => 'O campo pode conter apenas caracteres alfa-numéricos, sublinhados, e traços',
    'custom_alpha_numeric_underscore'  => 'O campo pode conter apenas caracteres alfa-numéricos e sublinhados',
	'alpha_numeric'         => 'O campo pode conter apenas caracteres alfa-numéricos',
	'alpha_numeric_space'   => 'O campo pode conter apenas caracteres alfa-numéricos e espaços',
	'alpha_space'           => 'O campo pode conter apenas caracteres alfabéticos e espaços',
	'decimal'               => 'O campo deve conter um número decimal',
	'differs'               => 'O campo deve ser diferente do campo {param}',
	'exact_length'          => 'O campo deve conter exatamente {param} caracteres',
	'greater_than'          => 'O campo deve conter um número maior que {param}',
	'greater_than_equal_to' => 'O campo deve conter um número maior ou igual a {param}',
	'in_list'               => 'O campo deve ser um desses: {param}',
	'integer'               => 'O campo deve conter um número inteiro',
	'is_natural'            => 'O campo deve conter apenas dígitos',
	'is_natural_no_zero'    => 'O campo deve conter apenas dígitos e deve ser maior que zero',
	'is_unique'             => 'O campo deve conter um valor único',
	'less_than'             => 'O campo deve conter um número menor que {param}',
	'less_than_equal_to'    => 'O campo deve conter um número menor ou igual a {param}',
	'matches'               => 'O campo não é igual ao campo {param}',
	'max_length'            => 'O campo não pode exceder {param} caracteres',
	'min_length'            => 'O campo deve conter pelo menos {param} caracteres',
	'numeric'               => 'O campo deve conter apenas números',
	'regex_match'           => 'O campo não está no formato correto',
	'required'              => 'O campo é obrigatório',
	'required_with'         => 'O campo é requerido quando {param} está presente',
	'required_without'      => 'O campo é requerido quando {param} não está presente',
	'timezone'              => 'O campo deve ser uma timezone válida',
	'valid_base64'          => 'O campo deve ser uma string base64 válida',
	'valid_email'           => 'O campo deve conter um endereço de e-mail válido',
	'valid_emails'          => 'O campo deve conter todos os endereços de e-mails válidos',
	'valid_ip'              => 'O campo deve conter um IP válido',
	'valid_url'             => 'O campo deve conter uma URL válida',
	'valid_date'            => 'O campo deve conter uma data válida',
    'valid_cpf'             => 'O campo deve conter um cpf válido',

	// Credit Cards
	'valid_cc_num'          => '{field} não parece ser um número de cartão de crédito válido.',

	// Files
	'uploaded'              => '{field} não é um arquivo de upload válido.',
	'max_size'              => '{field} é um arquivo muito grande.',
	'is_image'              => '{field} não é um arquivo de imagem válida do upload.',
	'mime_in'               => '{field} não tem um tipo mime válido.',
	'ext_in'                => '{field} não tem uma extensão de arquivo válida.',
	'max_dims'              => '{field} não é uma imagem, ou ela é muito larga ou muito grande.',
];
