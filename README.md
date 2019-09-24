# Kirby 3: Image Clip
Visual image clipping / cropping.

![Image Clip](https://sjc2.discourse-cdn.com/standard17/uploads/getkirby/optimized/2X/0/0e4da1619ba1abed2a2c263388d72e843eb7a978_2_604x499.gif)

## Overview

- [Installation](#Installation)
- [Requirements](#Requirements)
- [Consider a donation](#Consider-a-donation)
- [Panel Usage](#Panel-usage)
- [Replace Files Field](#replace-files-field)
- [Frontend Usage](#Frontend-usage)
   - [Single Image](#single-image)
   - [Multiple Images](#multiple-images)
   - [File Methods](#file-methods)
   - [Responsive: srcset](#file-srcset)
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
- Kirby 3.2.5
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

## Replace Files Field
The `image-clip` field is able to replace a `files` field by changing the field type. Simply replace
```yaml
type: files
```
with
```yaml
type: image-clip
```

*This works also vice versa to use the native `files` field instead of the `image-clip` field.*

## Frontend Usage
How to fetch the images defined in a `image-clip` field.
Read about the `clip()` method a bit further down.

### Single Image
```php
if ($image = $page->myimages()->toImage()) {
    echo $image->clip(500);
}
```
- **Important:** ~~toFile~~ does not work, use `toImage()` instead.
- `toImage()` returns a File Object with all it's functions.

### Multiple Images
```php
foreach($page->myimages()->toImages() as $image) {
    echo $image->clip(500);
}
```
- **Important:** ~~toFiles~~ does not work, use `toImages()` instead.
- `toImages()` returns a Files Collection with all it's functions.


### File Methods

#### `$file->clip()`
Clip and resize. Generates a Thumbnail of the clip area.

Adapter for `$file->thumb()`. Returns a FileVersion|File Object.
```php
if ($image = $page->myimages()->toImage()) {
    echo $image->clip(500);
}
```
```php
$file->clip(200, 300);   // bestfit
$file->clip(200);        // width 200px
$file->clip(null, 300);  // height 300px
$file->clip();           // clip area without resizing
```
- Used in combination with the `image-clip` Field, invokes automatically field clip data.
- Arguments: `clip(width, height)`
    - if `width` and `height` are both defined, the image will be resized with `bestfit`


#### `$file->srcset()`
Use this method to generate the srcset attribute for responsive images.
Read more about it's functionality in the [Kirby3 Docs](https://getkirby.com/docs/guide/templates/resize-images-on-the-fly#responsive-images)
```html
<?php if ($image = $page->myimages()->toImage()): ?>
    <img srcset="<?= $image->srcset([300, 800, 1024]) ?>">
<?php endif; ?>
```


#### `$file->thumb()`
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

#### `$file->getClip()`
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
