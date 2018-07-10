<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2e1a3fdd9cb7b6c9e95e4dcc2ed7d80d
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2e1a3fdd9cb7b6c9e95e4dcc2ed7d80d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2e1a3fdd9cb7b6c9e95e4dcc2ed7d80d::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}