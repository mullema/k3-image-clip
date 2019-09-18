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

                    // read from native files field
                    if (!is_array($item)) {
                        $id = $item;
                        $clip = null;
                    }
                    // read image-clip field
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
        // Adapt filepicker https://github.com/getkirby/kirby/blob/80b69380e672565a849037232c9951d1e32774c8/config/fields/mixins/filepicker.php
        'filepicker' => function (array $params = []) {
            // fetch the parent model
            $model = $this->model();
            // find the right default query
            if (empty($params['query']) === false) {
                $query = $params['query'];
            } elseif (is_a($model, 'Kirby\Cms\File') === true) {
                $query = 'file.siblings';
            } else {
                $query = $model::CLASS_ALIAS . '.files';
            }
            // fetch all files for the picker
            $files = $model->query($query, 'Kirby\Cms\Files');
            $data  = [];
            // prepare the response for each file
            foreach ($files as $index => $file) {
                if (empty($params['map']) === false) {
                    $data[] = $params['map']($file);
                } else {

                    // adapt for clip field
                    $data[] = array_merge(
                        $file->panelPickerData([
                            'image' => $params['image'] ?? [],
                            'info'  => $params['info'] ?? false,
                            'model' => $model,
                            'text'  => $params['text'] ?? '{{ file.filename }}',
                        ]),
                        // append more information for clip field
                        [
                            'resizable' => $file->isResizable(),
                            'dimensions' => $file->dimensions()
                        ]);
                }
            }
            return $data;
        }
    ],

    'api' => function () {
        return [
            // native field routes
            [
                'pattern' => '/',
                'action'  => function () {
                    $field = $this->field();

                    return $field->filepicker([
                        'query' => $field->query(),
                        'image' => $field->image(),
                        'info'  => $field->info(),
                        'text'  => $field->text()
                    ]);
                }
            ],
            [
                'pattern' => 'upload',
                'method'  => 'POST',
                'action'  => function () {
                    $field   = $this->field();
                    $uploads = $field->uploads();

                    return $field->upload($this, $uploads, function ($file, $parent) use ($field) {
                        return array_merge(
                            $file->panelPickerData([
                                'image' => $field->image(),
                                'info'  => $field->info(),
                                'model' => $field->model(),
                                'text'  => $field->text(),
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
                            $site = site();
                            if (!$parent = $site->page($uri)) {
                                $parent = $site->draft($uri);
                            }
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
                        ];
                    }
                    else {
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