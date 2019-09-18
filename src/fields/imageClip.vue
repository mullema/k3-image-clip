<template>
    <k-field v-bind="$props" class="k-files-field">

        <template v-if="more && !disabled" slot="options">
            <k-button-group class="k-field-options">
                <template v-if="uploads">
                    <k-dropdown>
                        <k-button
                                ref="pickerToggle"
                                icon="add"
                                class="k-field-options-button"
                                @click="$refs.picker.toggle()"
                        >
                            {{ $t('add') }}
                        </k-button>
                        <k-dropdown-content ref="picker" align="right">
                            <k-dropdown-item icon="check" @click="open">{{ $t('select') }}</k-dropdown-item>
                            <k-dropdown-item icon="upload" @click="upload">{{ $t('upload') }}</k-dropdown-item>
                        </k-dropdown-content>
                    </k-dropdown>
                </template>
                <template v-else>
                    <k-button icon="add" class="k-field-options-button" @click="open">{{ $t('add') }}</k-button>
                </template>
            </k-button-group>
        </template>

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
                    :sortable="!disabled && selected.length > 1"
                    :text="file.text"
                    :link="file.link"
                    :info="file.info"
                    :image="file.image"
                    :icon="file.icon"

                    :id="file.id"
                    :resizable="file.resizable"
                    :disabled="file.disabled"
                    @openclipdialog="openClipDialog"
                >
                    <k-button
                        v-if="!disabled"
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
        <k-upload ref="fileUpload" @success="selectUpload" />
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
                    item: "k-clip-list-item"
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
            this.getPreview(data.id, data.clip);
        },
        /**
         * Loads a clipped preview
         * @param id
         * @param clip
         */
        getPreview(id, clip) {
            this.$api
                .post(this.endpoints.field + "/preview", {
                    id: id,
                    width: clip.width,
                    height: clip.height,
                    top: clip.top,
                    left: clip.left
                })
                .then(data => {
                    if (data.image) {
                        let updated_image = this.selected.find(image => image.id === id);
                        updated_image.image = data.image;
                    }
                    else {
                        throw new Error("image clip: no image for preview received.")
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>