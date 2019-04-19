<?php

use Kirby\Cms\Field;
use Kirby\Cms\Files;
use mullema\File;

/**
 * Returns a file collection from a yaml list of filenames in the field
 * The File class is extended to save clip data
 * @param Field $field
 * @param string $separator
 * @return Files
 */
return function (Field $field, string $separator = 'yaml') {
    $parent = $field->parent();
    $files  = new Files([]);

    foreach ($field->toData($separator) as $value) {

        if ($file = $parent->kirby()->file($value['id'], $parent)) {
            $clipfile = new File([
                'filename' => $file->filename(),
                'parent' => $file->parent()
            ]);

            if ($clipfile) {
                $clipfile->setClip($value['clip'] ?? null);
                $files->add($clipfile);
            }
        }

    }
    return $files;
};