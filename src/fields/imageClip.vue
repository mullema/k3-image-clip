<template>
    <k-field v-bind="$props" class="k-files-field">
        <k-button
                v-if="more"
                slot="options"
                icon="add"
                @click="open"
        >
            {{ $t('select') }}
        </k-button>
        <template v-if="selected.length">
            <k-draggable
                :element="elements.list"
                :list="selected"
                :data-size="size"
                :handle="true"
                @end="onInput"
            >
                <component
                    v-for="(file, index) in selected"
                    :is="elements.item"
                    :key="file.filename"
                    :sortable="selected.length > 1"
                    :text="file.text"
                    :link="file.link"
                    :info="file.info"
                    :image="file.image"
                    :icon="file.icon"
                    :id="file.id"
                    :resizable="file.resizable"
                    @openclipdialog="openClipDialog"
                >
                    <k-button
                        slot="options"
                        :tooltip="$t('remove')"
                        icon="remove"
                        @click="remove(index)"
                    />
                </component>
            </k-draggable>
        </template>
        <k-empty
            v-else
            :layout="layout"
            icon="image"
            @click="open"
        >
            {{ empty || $t('field.files.empty') }}
        </k-empty>
        <k-files-dialog ref="selector" @submit="select" />
        <k-clip-dialog
            ref="clip"
            size="large"
            :image="clip_image"
            :clip="clip"
            @submit="clippedArea"
        />
    </k-field>
</template>

<script>
export default {
    extends: 'k-files-field',
    props: {
        clip: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            clip_image: {}
        }
    },
    computed: {
        elements() {
            const layouts = {
                cards: {
                    list: "k-cards",
                    item: "k-clip-card"
                },
                list: {
                    list: "k-list",
                    item: "k-list-item"
                }
            };
            if (layouts[this.layout]) {
                return layouts[this.layout];
            }
            return layouts["list"];
        },
    },
    methods: {
        openClipDialog(id) {
            this.clip_image = this.value.find(item => item.id === id);
            this.$refs.clip.open();
        },
        clippedArea(data) {
            this.clip_image.clip = data.clip;
            this.onInput();
            this.$emit('submit');
        }
    }
}
</script>