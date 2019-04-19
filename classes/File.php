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
}