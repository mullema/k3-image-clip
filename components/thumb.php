<?php

use Kirby\Cms\App;
use Kirby\Image\Darkroom;
use Kirby\Toolkit\F;

/**
 * Add your own thumb generator
 *
 * @param Kirby\Cms\App $kirby Kirby instance
 * @param string $src The root of the original file
 * @param string $dst The root to the desired destination
 * @param array $options All thumb options that should be applied: `width`, `height`, `crop`, `blur`, `grayscale`, `clip`
 * @return string
 */
return function (App $kirby, string $src, string $dst, array $options) {
    if (isset($options['clip'])) {

        $types = Kirby\Image\Darkroom::$types;

        Kirby\Image\Darkroom::$types['gd'] = 'mullema\GdLib';
        Kirby\Image\Darkroom::$types['im'] = 'mullema\ImageMagick';

        $darkroom = Darkroom::factory(option('thumbs.driver', 'gd'), option('thumbs', []));
        $options  = $darkroom->preprocess($src, $options);
        $root     = (new mullema\Filename($src, $dst, $options))->toString();
        F::copy($src, $root);
        $darkroom->process($root, $options);

        // reset types
        Kirby\Image\Darkroom::$types = $types;

        return $root;
    }

    $core = require $kirby->root('kirby') . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'components.php';
    return $core['thumb']($kirby, $src, $dst, $options);
};