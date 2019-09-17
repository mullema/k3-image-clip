<?php

use Kirby\Data\Yaml;
use mullema\File;

$base = require kirby()->root('kirby') . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'fields' . DIRECTORY_SEPARATOR . 'files.php';

return array_replace_recursive($base, [
    'props' => [
        'clip' => function ($clip = []) {
            return Yaml::decode($clip);
        }
    ],
    'methods' => [
        'fileResponse' => function ($file, $clip = null) {
            // native response https://github.com/getkirby/kirby/blob/80b69380e672565a849037232c9951d1e32774c8/config/fields/files.php#L69
            if (!$clip) {
                return $file->panelPickerData([
                    'image' => $this->image,
                    'info'  => $this->info ?? false,
                    'model' => $this->model(),
                    'text'  => $this->text,
                ]);
            }

            // with clip data create new mullema\File object with adjusted srcset method
            $clipfile = new File([
                'filename' => $file->filename(),
                'parent' => $file->parent()
            ]);

            $clipfile->setClip($clip);

            return array_merge(
                $clipfile->panelPickerData([
                    'image' => $this->image,
                    'info'  => $this->info ?? false,
                    'model' => $this->model(),
                    'text'  => $this->text,
                ]),
                // append more information for clip field
                [
                    'resizable' => $clipfile->isResizable(),
                    'clip' => $clip,
                    'dimensions' => $clipfile->dimensions()
                ]);
        },
        'toFiles' => function ($value = null) {
            $files = [];
                foreach (Yaml::decode($value) as $item) {
                    if ($item['id'] !== null && ($file = $this->kirby()->file($item['id'], $this->model()))) {
                        // add clip as parameter to fileResponse call
                        $files[] = $this->fileResponse($file, $item['clip'] ?? null);
                    }
            }

            return $files;
        }
    ],

    /*
    'api' => function () {
        return [
            [
                'pattern' => '/',
                'action' => function () {
                    $field = $this->field();
                    $files = $field->model()->query($field->query(), 'Kirby\Cms\Files');
                    $data  = [];
                    $saved = $field->value();

                    foreach ($files as $index => $file) {
                        // https://www.php.net/manual/de/function.array-search.php#116635
                        $key = array_search((string) $file->id(), array_column($saved, 'id'));
                        if ($key !== false) {
                            // get from saved to preserve clip information
                            $data[] = $saved[$key];
                        }
                        else {
                            $data[] = $field->fileResponse($file);
                        }
                    }
                    return $data;
                }
            ]
        ];
    },
    */

    'save' => function ($value = null) {
        $result = [];
        foreach ($value as $item) {
            if (isset($item['clip'])) {
                $result[] = [
                    'id' => $item['id'],
                    'clip' => $item['clip']
                ];
            }
            else {
                $result[] = [
                    'id' => $item['id']
                ];
            }
        }
        return $result;
    }
]);