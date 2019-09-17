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
     * @throws \Kirby\Exception\InvalidArgumentException
     */
    public function clip($width = null, $height = null) {
        return $this->thumb([
            'width' => $width,
            'height' => $height,
            'clip' => $this->getClip()
        ]);
    }

    /**
     * Add Clip functionality to srcset
     * https://github.com/getkirby/kirby/blob/80b69380e672565a849037232c9951d1e32774c8/src/Cms/FileModifications.php#L110
     *
     * Create a srcset definition for the given sizes
     * Sizes can be defined as a simple array. They can
     * also be set up in the config with the thumbs.srcsets option.
     * @param array|string $sizes
     * @return string|null
     * @throws \Kirby\Exception\InvalidArgumentException
     * @since 3.1.0
     *
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
            if (is_array($value)) {
                $options = $value;
                $condition = $key;
            } elseif (is_string($value) === true) {
                $options = [
                    'width' => $key
                ];
                $condition = $value;
            } else {
                $options = [
                    'width' => $value
                ];
                $condition = $value . 'w';
            }

            // add clip information
            $options['clip'] = $this->getClip();

            $set[] = $this->thumb($options)->url() . ' ' . $condition;
        }

        return implode(', ', $set);
    }
}