import imageClip from "./fields/imageClip.vue";
import clipCard from "./components/clipCard.vue";
import clipHandle from "./components/clipHandle.vue";
import clipDialog from "./components/clipDialog.vue";

panel.plugin("mullema/image-clip", {
    fields: {
        'image-clip': imageClip
    },
    components: {
        'k-clip-card': clipCard,
        'k-clip-handle': clipHandle,
        'k-clip-dialog': clipDialog
    }
});