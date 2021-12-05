<template>
  <div
      v-if="image"
      class="k-item-figure relative"
      :style="{ background: $helper.color(back) }"
  >
    <!-- image clip handle //-->
    <k-clip-handle
        v-if="resizable && !disabled"
        @clicked="$emit('clicked')"
        :layout="layout"
    />

    <!-- image -->
    <k-image
        v-if="image.src"
        :cover="image.cover"
        :ratio="ratio"
        :sizes="sizes"
        :src="image.src"
        :srcset="image.srcset"
        class="k-item-image"
    />
    <!-- icon -->
    <k-aspect-ratio
        v-else
        :ratio="ratio"
    >
      <k-icon
          :color="$helper.color(image.color)"
          :size="size"
          :type="image.icon"
          class="k-item-icon"
      />
    </k-aspect-ratio>
  </div>
</template>
<script>
export default {
  extends: 'k-item-image',
  props: {
    id: String,
    resizable: Boolean,
    disabled: Boolean
  }
}
</script>

<style scoped>
  .relative {
    position: relative;
  }
</style>