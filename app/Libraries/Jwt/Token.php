<?php

namespace App\Libraries\Jwt;

use CodeIgniter\HTTP\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Token
{
    public static function encode(array $data): string
    {
        $payload = [
            'exp' => time() + 60 * 60 * 24 * 7,
            'iat' => time(),
            ...$data
        ];
        $key = getenv('encryption.key');

        return JWT::encode($payload, $key, 'HS256');
    }

    public static function decode(string $token = null): false|\StdClass
    {
        $key = getenv('encryption.key');
        $token ??= str_replace('Bearer ', '', request()->headers()['Authorization']->getValue());

        try {
            return JWT::decode($token, new Key($key, 'HS256'));
        } catch(\Throwable $th) {
            return false;
        }

    }
}