<?php

use Kirby\Data\Yaml;

$base = require kirby()->root('kirby') . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'fields' . DIRECTORY_SEPARATOR . 'files.php';

return array_replace_recursive($base, [
    'props' => [
        'clip' => function ($clip = []) {
            return Yaml::decode($clip);
        }
    ],
    'methods' => [
        'fileResponse' => function ($file, $clip = null) {
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
                    'dimensions' => $file->dimensions(),
                    // panel iamge does not accept thumb anymore...do it yourself
                    // make my own srcset method based on https://github.com/getkirby/kirby/blob/03d6e96aa27f631e5311cb6c2109e1510505cab7/src/Cms/ModelWithContent.php#L301
                    // array replace and rewrite panelImage method to clip 
                    'thumbnail' => $file->thumb(['clip' => $clip])->url()
                ]);
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