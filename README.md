# Kirby 3: Image Clip
Visual image clipping / cropping.

![Image Clip](https://www.moeli.com/github/image-clip.PNG)

## Overview

- [Installation](#Installation)
- [Requirements](#Requirements)
- [Consider a donation](#Consider a donation)
- [Panel Usage](#Panel Usage)
- [Frontend Usage](#Frontend Usage)

## Installation
### Download

Download and copy this repository to `/site/plugins/k3-image-clip`

### Git submodule

```
git submodule add https://github.com/mullema/k3-image-clip.git site/plugins/k3-image-clip
```

### Composer

```
composer require mullema/k3-image-clip
```

## Requirements
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
  query: site.find('photography/animals').files
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
```php
$file->clip(200, 300);
$file->clip(200);
$file->clip(null, 300);
```
- Used in combination with the `image-clip` Field.
- Arguments: `clip(width, height)`
    - if `width` and `height` are both defined, the image will be resized with `bestfit`


#### Improved `$file->thumb()`
The thumb method accepts not the option `clip`
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


## License
MIT

## Credits
- [Matthias Müller](https://github.com/mullema/)