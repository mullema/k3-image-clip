<?php

load([
    'mullema\\File' => 'classes/File.php',
    'mullema\\Filename' => 'classes/Filename.php',
    'mullema\\GdLib' => 'classes/GdLib.php',
    'mullema\\Imagemagick' => 'classes/ImageMagick.php',
], __DIR__);

Kirby::plugin('mullema/k3-image-clip', [
    'options' => [
        'panelthumbs' => [
            'cards' => [
                'width'  => 400,
                'height' => 400
            ],
            'list' => [
                'width'  => 100,
                'height' => 100
            ]
        ]
    ],
    'components' => [
        'file::version' => include __DIR__ . '/components/file-version.php',
        'thumb' => include __DIR__ . '/components/thumb.php'
    ],
    'fields' => [
        'image-clip' => include __DIR__ . '/fields/image-clip.php'
    ],
    'fieldMethods' => [
        'toImage' => include __DIR__ . '/fieldMethods/toImage.php',
        'toImages' => include __DIR__ . '/fieldMethods/toImages.php',
    ]
]);

