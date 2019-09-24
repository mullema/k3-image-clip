<?php

use Kirby\Cms\App;
use Kirby\Data\Data;
use Kirby\Cms\FileVersion;
use Kirby\Image\Darkroom;

/**
 * Adapt file characteristics
 *
 * @param Kirby\Cms\App $kirby Kirby instance
 * @param Kirby\Cms\File|Kirby\Cms\FileModifications $file The file object
 * @param array $options All thumb options (width, height, crop, blur, grayscale, clip)
 * @return Kirby\Cms\File|Kirby\Cms\FileVersion
 */
return function (App $kirby, $file, array $options = []) {
    if(!isset($options['clip'])) {
        $core = require $kirby->root('kirby') . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'components.php';
        return $core['file::version']($kirby, $file, $options);
    }

    if ($file->isResizable() === false) {
        return $file;
    }

    // create url and root
    $mediaRoot = dirname($file->mediaRoot());
    $dst       = $mediaRoot . '/{{ name }}{{ attributes }}.{{ extension }}';
    $thumbRoot = (new mullema\Filename($file->root(), $dst, $options))->toString();
    $thumbName = basename($thumbRoot);
    $job       = $mediaRoot . '/.jobs/' . $thumbName . '.json';

    if (file_exists($thumbRoot) === false) {
        try {
            Data::write($job, array_merge($options, [
                'filename' => $file->filename()
            ]));
        } catch (Throwable $e) {
            return $file;
        }
    }

    return new FileVersion([
        'modifications' => $options,
        'original'      => $file,
        'root'          => $thumbRoot,
        'url'           => dirname($file->mediaUrl()) . '/' . $thumbName,
    ]);
};