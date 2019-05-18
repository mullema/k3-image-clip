<?php

namespace mullema;

use Kirby\Cms;

class File extends Cms\File {

    /**
     * Clip Information from Field
     * @var array
     */
    private $clip;

    public function setClip($value) {
        $this->clip = $value;
    }

    public function getClip() {
        return $this->clip;
    }

    /**
     * Clip
     * @param null $width - Thumb width
     * @param null $height - Thumb height
     * @return Cms\File|Cms\FileVersion
     */
    public function clip($width = null, $height = null) {
        return $this->thumb([
            'width' => $width,
            'height' => $height,
            'clip' => $this->getClip()
        ]);
    }

    /**
     * Create a srcset definition for the given sizes
     * Sizes can be defined as a simple array. They can
     * also be set up in the config with the thumbs.srcsets option.
     *
     * From: https://github.com/getkirby/kirby/blob/2b0bfd0b47a308e09117bac95ac674fdf50ce36c/src/Cms/FileModifications.php#L102
     *
     * @param array|string $sizes
     * @return string
     */
    public function srcset($sizes = null): ?string
    {
        if (empty($sizes) === true) {
            $sizes = $this->kirby()->option('thumbs.srcsets.default', []);
        }

        if (is_string($sizes) === true) {
            $sizes = $this->kirby()->option('thumbs.srcsets.' . $sizes, []);
        }

        if (is_array($sizes) === false || empty($sizes) === true) {
            return null;
        }

        $set = [];
        foreach ($sizes as $key => $value) {
            if (is_string($value) === true) {
                $size = $key;
                $attr = $value;
            } else {
                $size = $value;
                $attr = $value . 'w';
            }

            $set[] = $this->clip($size)->url() . ' ' . $attr;
        }

        return implode(', ', $set);
    }
}