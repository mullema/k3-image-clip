import imageClip from './fields/imageClip.vue'
import clipItems from './components/clipItems.vue'
import clipItem from './components/clipItem.vue'
import clipItemImage from './components/clipItemImage.vue'
import clipHandle from './components/clipHandle.vue'
import clipDialog from './components/clipDialog.vue'
import structurePreview from './components/structurePreview.vue'

panel.plugin('mullema/image-clip', {
  fields: {
    'image-clip': imageClip
  },
  components: {
    'k-clip-items': clipItems,
    'k-clip-item': clipItem,
    'k-clip-item-image': clipItemImage,
    'k-clip-handle': clipHandle,
    'k-clip-dialog': clipDialog,
    'k-image-clip-field-preview': structurePreview,
  }
})
