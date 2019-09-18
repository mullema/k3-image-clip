import imageClip from "./fields/imageClip.vue";
import clipCard from "./components/clipCard.vue";
import clipHandle from "./components/clipHandle.vue";
import clipListItem from "./components/clipListItem.vue";
import clipButton from "./components/clipButton.vue";
import clipDialog from "./components/clipDialog.vue";
import structurePreview from "./components/structurePreview.vue";

panel.plugin("mullema/image-clip", {
    fields: {
        'image-clip': imageClip
    },
    components: {
        'k-clip-card': clipCard,
        'k-clip-handle': clipHandle,
        'k-clip-list-item': clipListItem,
        'k-clip-button': clipButton,
        'k-clip-dialog': clipDialog,
        'k-image-clip-field-preview': structurePreview
    }
});
