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
            if ($clip) {
                // with clip data create new mullema\File object with adjusted srcset method
                $file = new File([
                    'filename' => $file->filename(),
                    'parent' => $file->parent()
                ]);

                $file->setClip($clip);
            }

            return array_merge(
                $file->panelPickerData([
                    'image' => $this->image,
                    'info'  => $this->info ?? false,
                    'model' => $this->model(),
                    'text'  => $this->text,
                ]),
                // append more information for clip field
                [
                    'resizable' => $file->isResizable(),
                    'clip' => $clip,
                    'dimensions' => $file->dimensions()
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


    'api' => function () {
        return [
            [
                // returns a clipped image preview
                'pattern' => '/preview',
                'action' => function () {
                    $id = get('id');
                    $clip = [
                        'width' => (int) get('width'),
                        'height' => (int) get('height'),
                        'top' => (int) get('top'),
                        'left' => (int) get('left')
                    ];

                    // from https://github.com/getkirby/kirby/blob/3.2.4/config/helpers.php#L251
                    $uri      = dirname($id);
                    $filename = basename($id);

                    if ($uri === '.') {
                        $uri = null;
                    }

                    switch ($uri) {
                        case '/':
                            $parent = site();
                            break;
                        case null:
                            $parent = page();
                            break;
                        default:
                            $parent = page($uri);
                            break;
                    }

                    if ($parent) {
                        $file = new File([
                            'filename' => $filename,
                            'parent' => $parent
                        ]);

                        $file->setClip($clip);

                        return [
                            'image' => $file->panelImage($id),
                            'resizable' => $file->isResizable(),
                            'clip' => $clip,
                            'dimensions' => $file->dimensions()
                        ];

                    }
                    else {
                        throw new Exception("Clip: Could not find image by id for preview.");
                    }
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