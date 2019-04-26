# Kirby 3: Image Clip
Visual image clipping / cropping.

![Image Clip](https://www.moeli.com/github/image-clip.PNG)

## Overview

- [Installation](#Installation)
- [Requirements](#Requirements)
- [Consider a donation](#Consider-a-donation)
- [Panel Usage](#Panel-usage)
- [Frontend Usage](#Frontend-usage)
- [License](#License)

## Installation
#### Download

Download and copy this repository to `/site/plugins/k3-image-clip`

#### Git submodule

```
git submodule add https://github.com/mullema/k3-image-clip.git site/plugins/k3-image-clip
```

#### Composer

```
composer require mullema/k3-image-clip
```

### Requirements
- Kirby 3.x
- GD Library or ImageMagick

## Consider a donation
This plugin is free but if you use it in a commercial project please consider to [make a donation](https://www.paypal.me/mullema/10).


## Panel Usage
This plugin comes with a `image-clip` field. It is based on the `files` field and supports all it's options. Read more about the `files` field in the [Kirby3 Docs](https://getkirby.com/docs/reference/panel/fields/files).

Example blueprint:
```yaml
myimages:
  type: image-clip
  query: site.find('photography/animals').images
  layout: cards
  size: small
  clip:
    minwidth: 400
    minheight: 300
    maxwidth: 800
    maxheight: 600
    ratio: fixed
```
- All values are in Pixels.
- `minwidth`, `minheight`, `maxwidth`, `maxheight` limit the clip/crop select area.
- None of the clip options are required, but in most cases it is recommended to define `minwidth` and `minheight`. 
- Often it makes more sense to resize the resulting image than defining `maxwidth` and `maxheight`.
- `ratio: fixed` locks the ratio 
    - if `minwidth` and `minheight` are defined,
    - or `maxwidth` and `maxheight` are defined,
    - or all of the above.

The field does basic checks of image size and type but counts mainly on you defining e.g, accepted mime types or image sizes in a [File Blueprint](https://getkirby.com/docs/reference/panel/blueprints/file). You can filter the images list by template like that:
```yaml
query: site.find('photography').children.images.filterBy('template', 'cover')
```

### Panel thumb size
In kirbys config.php you can adjust the maximal thumbnail sizes that are displayed in the `image-clip` field.
Default is 400px width or 400px height for cards and 100px width or 100px height for lists. 

If your cards get bigger you might want to adjust the numbers to 800x800px.

__Note__: This is only about thumbnail quality in the panel. You don't need to match the clip area numbers.
```php
    'options' => [
        'panelthumbs' => [
            'cards' => [
                'width'  => 400,
                'height' => 400
            ],
            'list' => [
                'width'  => 100,
                'height' => 100
            ]
        ]
    ]
```

## Frontend Usage
How to fetch the images defined in a `image-clip` field.
#### Multiple Images
```php
foreach($page->myimages()->toImages() as $image) {
    echo $image->clip(500);
}
```
- **Important:** ~~toFiles~~ does not work, use `toImages()` instead.
- `toImages()` returns a Files Collection with all it's functions.

#### Single Image
```php
if ($image = $page->myimages()->toImage()) {
    echo $image->clip(500);
}
```
- **Important:** ~~toFile~~ does not work, use `toImage()` instead.
- `toImage()` returns a File Object with all it's functions.


#### `$file->clip()`
Adapter for `$file->thumb()`. Returns a FileVersion|File Object.
```php
$file->clip(200, 300);   // bestfit
$file->clip(200);        // width 200px
$file->clip(null, 300);  // height 300px
$file->clip();           // clip area without resizing
```
- Used in combination with the `image-clip` Field, invokes automatically field clip data.
- Generates a Thumbnail of the clip area.
- Arguments: `clip(width, height)`
    - if `width` and `height` are both defined, the image will be resized with `bestfit`


### Improved `$file->thumb()`
The thumb method accepts now the option `clip` and can be used with any resizable image.
```php
$file->thumb([
    'width' => 400,
    'clip' => [
       'width' => 500,
       'height' => 200,
       'top' => 10,
       'left' => 200
    ]
]);
```
- Clips/crops a square of 500x200px, 10px from top and 200px from the left end of the original image.
- Resizes the resulting image to 400px width.
- If `clip` and `crop` are used at the same time, `crop` will be ignored.

Read more about the `thumb` method in the [Kirby3 Docs](https://getkirby.com/docs/reference/objects/file/thumb)

### Helper `$file->getClip()`
Returns the clip data.

Can be useful e.g with the `$file->thumb()` method.
```php
if ($image = $page->myimages()->toImage()) {
    echo $image->thumb([
       'width' => 1200,
       'grayscale' => true,
       'clip' => $image->getClip()
    ]);
}
```

## License
MIT

## Credits
- [Matthias Müller](https://github.com/mullema/)