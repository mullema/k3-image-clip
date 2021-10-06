<?php

use Kirby\Data\Data;
use mullema\File;
use mullema\FilePicker;

$base = require kirby()->root('kirby') . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'fields' . DIRECTORY_SEPARATOR . 'files.php';

return array_replace_recursive($base, [
    'props' => [
        'clip' => function ($clip = []) {
            return Data::decode($clip, 'yaml');
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
                $file->panel()->pickerData([
                    'image' => $this->image,
                    'info' => $this->info ?? false,
                    'layout' => $this->layout,
                    'model' => $this->model(),
                    'text' => $this->text,
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
            foreach (Data::decode($value, 'yaml') as $item) {

                // read from native files field
                if (!is_array($item)) {
                    $id = $item;
                    $clip = null;
                } // read image-clip field
                else {
                    $id = $item['id'];
                    $clip = $item['clip'] ?? null;
                }

                if ($id !== null && ($file = $this->kirby()->file($id, $this->model()))) {
                    // add clip as parameter to fileResponse call
                    $files[] = $this->fileResponse($file, $clip);
                }
            }

            return $files;
        },

        /**
         * Overwrite the filepicker mixin https://github.com/getkirby/kirby/blob/master/config/fields/mixins/filepicker.php
         * use own FilePicker class
         */
        // Overwrite filepicker mixin
        'filepicker' => function (array $params = []) {
            $params['model'] = $this->model();
            return (new FilePicker($params))->toArray();
        }
    ],

    'api' => function () {
        return [
            // native field routes
            [
                'pattern' => '/',
                'action' => function () {
                    $field = $this->field();

                    return $field->filepicker([
                        'image' => $field->image([], $field->layout),
                        'info' => $field->info(),
                        'limit' => $field->limit(),
                        'page' => $this->requestQuery('page'),
                        'query' => $field->query(),
                        'search' => $this->requestQuery('search'),
                        'text' => $field->text()
                    ]);
                }
            ],
            [
                'pattern' => 'upload',
                'method' => 'POST',
                'action' => function () {
                    $field = $this->field();
                    $uploads = $field->uploads();

                    return $field->upload($this, $uploads, function ($file, $parent) use ($field) {
                        return array_merge(
                            $file->panel()->pickerData([
                                'image' => $field->image([], $field->layout),
                                'info' => $field->info(),
                                'model' => $field->model(),
                                'text' => $field->text(),
                            ]),
                            // append more information for clip field
                            [
                                'resizable' => $file->isResizable(),
                                'dimensions' => $file->dimensions()
                            ]
                        );
                    });
                }
            ],

            // clip field routes
            [
                // returns a clipped image preview
                'pattern' => 'preview',
                'method' => 'POST',
                'action' => function () {
                    $id = get('id');
                    $clip = [
                        'width' => (int)get('width'),
                        'height' => (int)get('height'),
                        'top' => (int)get('top'),
                        'left' => (int)get('left')
                    ];

                    // from https://github.com/getkirby/kirby/blob/3.2.4/config/helpers.php#L251
                    $uri = dirname($id);
                    $filename = basename($id);

                    if ($uri === '.') {
                        $uri = null;
                    }

                    // if no uri, find out whether the file is from Site or Home Page
                    if (!$uri) {
                        if ($this->data()['field']->model() instanceof Kirby\Cms\Site) {
                            $parent = site();
                        } else {
                            $parent = page(); // home
                        }
                    } else {
                        $site = site();
                        if (!$parent = $site->page($uri)) {
                            $parent = $site->draft($uri);
                        }
                    }

                    if ($parent) {
                        $file = new File([
                            'filename' => $filename,
                            'parent' => $parent
                        ]);

                        $file->setClip($clip);

                        return [
                            'image' => $file->panel()->image([], $this->field()->layout),
                        ];
                    } else {
                        throw new Exception("Clip: Could not find image parent.");
                    }
                }
            ],
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
            } else {
                $result[] = [
                    'id' => $item['id']
                ];
            }
        }
        return $result;
    }
]);