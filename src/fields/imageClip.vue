<template>
  <k-field v-bind="$props" class="k-files-field">
    <template v-if="more && !disabled" #options>
      <k-button-group class="k-field-options">
        <k-options-dropdown
            ref="options"
            v-bind="options"
            @action="onAction"
        />
      </k-button-group>
    </template>

    <k-dropzone :disabled="more === false" @drop="drop">
      <template v-if="selected.length">
        <k-clip-items
            :items="selected"
            :layout="layout"
            :size="size"
            :sortable="!disabled && selected.length > 1"
            @sort="onInput"
            @sortChange="$emit('change', $event)"

            @openClipDialog="openClipDialog"
        >
          <template #options="{ index }">
            <k-button
                v-if="!disabled"
                :tooltip="$t('remove')"
                icon="remove"
                @click="remove(index)"
            />
          </template>
        </k-clip-items>
      </template>
      <k-empty
          v-else
          :layout="layout"
          :data-invalid="isInvalid"
          icon="image"
          @click="prompt"
      >
        {{ empty || $t('field.files.empty') }}
      </k-empty>
    </k-dropzone>

    <k-files-dialog ref="selector" @submit="select"/>
    <k-upload ref="fileUpload" @success="upload"/>

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
  data () {
    return {
      clip_image: {}
    }
  },
  methods: {
    openClipDialog (id) {
      this.clip_image = this.value.find(item => item.id === id)
      this.$refs.clip.open()
    },
    clippedArea (data) {
      this.clip_image.clip = data.clip
      this.onInput()
      this.getPreview(data.id, data.clip)
    },
    /**
     * Loads a clipped preview
     * @param image_id
     * @param clip
     */
    getPreview (image_id, clip) {
      this.$api
          .post(this.endpoints.field + '/preview', {
            id: image_id,
            width: clip.width,
            height: clip.height,
            top: clip.top,
            left: clip.left
          })
          .then(data => {
            if (data.image) {
              let field_name = this.name
              let content_id = this.$store.state.content.current
              let field_model = this.$store.getters['content/values'](content_id)[field_name]

              // regular field
              // update vuex store with new thumbnail urls
              if (field_model) {
                let changed_image = field_model.find(image => image.id === image_id)
                // new preview image to image model
                changed_image.image = data.image
                this.$store.dispatch('content/update', [field_name, field_model, content_id])
              }
                  // field inside a structure field
              // store gets automatically updated when OK clicked
              else {
                let updated_image = this.selected.find(image => image.id === image_id)
                updated_image.image = data.image
              }
            } else {
              throw new Error('image clip: no image for preview received.')
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>