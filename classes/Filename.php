<?php

namespace mullema;

use Kirby\Cms;
use Kirby\Toolkit\Str;

/**
 * The Filename class handles complex
 * mapping of file attributes (i.e for thumbnails)
 * into human readable filenames.

 * // extended to support clip
 * $filename = new Filename('some-file.jpg', '{{ name }}-{{ attributes }}.{{ extension }}', [
 *   'width'   => 300,
 *   'height'  => 200
 *   'quality' => 80
 *   'clip' => 'clip' => [
 *       'width' => 150,
 *       'height' => 150,
 *       'top' => 10,
 *       'left' => 10
 *   ]
 * ]);
 *
 * echo $filename->toString();
 * // result: some-file-300x200-q80-clip150x150-10x10.jpg
 */
class Filename extends Cms\Filename {

    /**
     * Converts all processed attributes
     * to an array. The array keys are already
     * the shortened versions for the filename
     *
     * @return array
     */
    public function attributesToArray(): array
    {
        $array = [
            'dimensions' => implode('x', $this->dimensions()),
            'crop'       => $this->crop(),
            'blur'       => $this->blur(),
            'bw'         => $this->grayscale(),
            'q'          => $this->quality(),
            'clip'       => $this->clip(),
        ];

        $array = array_filter($array, function ($item) {
            return $item !== null && $item !== false && $item !== '';
        });

        return $array;
    }

    /**
     * Normalizes the clip option value
     *
     * @return false|string
     */
    public function clip()
    {
        $clip = $this->attributes['clip'] ?? false;

        if ($clip === false) {
            return false;
        }

        return Str::slug(($clip['width'] ?? 0) . 'x' . ($clip['height'] ?? 0) . '-' . ($clip['top'] ?? 0) . 'x' . ($clip['left'] ?? 0));
    }
}