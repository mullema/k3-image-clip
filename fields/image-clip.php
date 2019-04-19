<?php

use Kirby\Data\Yaml;

$base = require kirby()->roots()->kirby . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'fields' . DIRECTORY_SEPARATOR . 'files.php';

return array_replace_recursive($base, [
    'props' => [
        'clip' => function ($clip = []) {
            return Yaml::decode($clip);
        }
    ],
    'methods' => [
        'fileResponse' => function (Kirby\Cms\File $file, $clip = null) {
            if ($this->layout === 'list') {
                $thumb = [
                    'width'  => 100,
                    'height' => 100
                ];
            } else {
                $thumb = [
                    'width'  => 400,
                    'height' => 400
                ];
            }

            if ($clip) {
                $thumb['clip'] = $clip;
            }

            $image = $file->panelImage($this->image, $thumb);
            $model = $this->model();
            $uuid  = $file->parent() === $model ? $file->filename() : $file->id();

            return [
                'filename' => $file->filename(),
                'text'     => $file->toString($this->text),
                'link'     => $file->panelUrl(true),
                'id'       => $file->id(),
                'uuid'     => $uuid,
                'url'      => $file->url(),
                'info'     => $file->toString($this->info ?? false),
                'image'    => $image,
                'icon'     => $file->panelIcon($image),
                'type'     => $file->type(),
                'resizable' => $file->isResizable(),     // trigger for clip handler
                'clip'      => $clip,
                'dimensions' => $file->dimensions()
            ];
        },
        'toFiles' => function ($value = null) {
            $files = [];

            foreach (Yaml::decode($value) as $item) {
                 if ($item['id'] !== null && ($file = $this->kirby()->file($item['id'], $this->model()))) {
                     $files[] = $this->fileResponse($file, $item['clip'] ?? null);
                }
            }

            return $files;
        }
    ],
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