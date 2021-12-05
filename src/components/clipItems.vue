<template>
  <k-draggable
      class="k-items"
      :class="'k-' + layout + '-items'"
      :handle="true"
      :options="dragOptions"
      :data-layout="layout"
      :data-size="size"
      :list="items"
      @change="$emit('change', $event)"
      @end="$emit('sort', items, $event)"
  >
    <slot>
      <k-clip-item
          v-for="(item, itemIndex) in items"
          :key="item.id || itemIndex"
          v-bind="item"
          :class="{'k-draggable-item': sortable && item.sortable}"
          :image="imageOptions(item)"
          :layout="layout"
          :sortable="sortable && item.sortable"
          :width="item.column"
          @click="$emit('item', item, itemIndex)"
          @drag="onDragStart($event, item.dragText)"
          @flag="$emit('flag', item, itemIndex)"
          @mouseover.native="$emit('hover', $event, item, itemIndex)"
          @option="$emit('option', $event, item, itemIndex)"

          @openClipDialog="(id) => $emit('openClipDialog', id)"
      >
        <template #options>
          <slot
              name="options"
              :item="item"
              :index="itemIndex"
          />
        </template>
      </k-clip-item>
    </slot>
  </k-draggable>
</template>

<script>
export default {
  extends: 'k-items',
  computed: {},
}
</script>

<style scoped>

</style>