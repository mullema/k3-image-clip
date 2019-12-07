<?php


namespace mullema;

use Kirby\Cms;

class FilePicker extends CMS\FilePicker
{
    /**
     * Overwrite https://github.com/getkirby/kirby/blob/master/src/Cms/Picker.php#L89
     *
     * Adds clip field specific properties
     *
     * @param \Kirby\Cms\Collection|null $items
     * @return array
     */
    public function itemsToArray($items = null): array
    {
        if ($items === null) {
            return [];
        }
        $result = [];
        foreach ($items as $index => $item) {
            if (empty($this->options['map']) === false) {
                $result[] = $this->options['map']($item);
            } else {
                $result[] = array_merge(
                    $item->panelPickerData([
                        'image' => $this->options['image'],
                        'info'  => $this->options['info'],
                        'model' => $this->options['model'],
                        'text'  => $this->options['text'],
                    ]),
                    // append more information for clip field
                    [
                        'resizable' => $item->isResizable(),
                        'dimensions' => $item->dimensions()
                    ]);
            }
        }
        return $result;
    }
}