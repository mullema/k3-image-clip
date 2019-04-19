<?php

namespace mullema;

use Kirby\Image\Darkroom;

class ImageMagick extends Darkroom\ImageMagick
{
    protected function resize(string $file, array $options): string
    {
        // clip
        if (isset($options['clip'])) {
            $command = sprintf('-crop %sx%s+%s+%s', $options['clip']['width'], $options['clip']['height'], $options['clip']['left'], $options['clip']['top']);
            $command  .= sprintf(' -resize %sx%s^', $options['width'], $options['height']);
            return $command;
        }

        // simple resize
        if ($options['crop'] === false) {
            return sprintf('-resize %sx%s!', $options['width'], $options['height']);
        }

        $gravities = [
            'top left'     => 'NorthWest',
            'top'          => 'North',
            'top right'    => 'NorthEast',
            'left'         => 'West',
            'center'       => 'Center',
            'right'        => 'East',
            'bottom left'  => 'SouthWest',
            'bottom'       => 'South',
            'bottom right' => 'SouthEast'
        ];

        // translate the gravity option into something imagemagick understands
        $gravity = $gravities[$options['crop']] ?? 'Center';
        $command  = sprintf('-resize %sx%s^', $options['width'], $options['height']);
        $command .= sprintf(' -gravity %s -crop %sx%s+0+0', $gravity, $options['width'], $options['height']);
        return $command;
    }
}