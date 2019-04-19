<?php

namespace mullema;

use Kirby\Image\Darkroom;
use claviska\SimpleImage;

class GdLib extends Darkroom\GdLib
{
    protected function resize(SimpleImage $image, array $options)
    {
        // clip
        if (isset($options['clip'])) {
            $x1 = $options['clip']['left'];
            $y1 = $options['clip']['top'];
            $x2 = $options['clip']['left'] + $options['clip']['width'];
            $y2 = $options['clip']['top'] + $options['clip']['height'];

            return $image->crop($x1, $y1, $x2, $y2)->resize($options['width'], $options['height']);
        }

        if ($options['crop'] === false) {
            return $image->resize($options['width'], $options['height']);
        }

        return $image->thumbnail($options['width'], $options['height'] ?? $options['width'], $options['crop']);
    }
}