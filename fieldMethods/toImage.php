<?php
use Kirby\Cms\Field;
use Kirby\Cms\File;

/**
 * Returns a file object from a filename in the field
 *
 * @param Field $field
 * @return File|null
 */
return function (Field $field) {
    return $field->toImages()->first();
};