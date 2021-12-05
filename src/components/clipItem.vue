<template>
  <article
      :class="layout ? 'k-' + layout + '-item' : false"
      v-bind="data"
      :data-has-figure="hasFigure"
      :data-has-info="Boolean(info)"
      :data-has-label="Boolean(label)"
      :data-has-options="Boolean(options)"
      class="k-item"
      tabindex="-1"
      @click="$emit('click', $event);"
      @dragstart="$emit('drag', $event)"
  >
    <!-- Image -->
    <k-clip-item-image
        v-if="hasFigure"
        :image="image"
        :layout="layout"
        :width="width"

        :id="id"
        :resizable="resizable"
        :disabled="disabled"
        @clicked="$emit('openClipDialog', id)"
    />

    <!-- Sort handle -->
    <k-sort-handle
        v-if="sortable"
        class="k-item-sort-handle"
    />

    <!-- Content -->
    <header class="k-item-content">
      <h3 class="k-item-title">
        <k-link
            v-if="link"
            :target="target"
            :to="link"
            class="k-item-title-link"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="title" />
        </k-link>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-else v-html="title" />
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-if="info" class="k-item-info" v-html="info" />
    </header>

    <!-- Footer -->
    <footer
        v-if="flag || options || $slots.options"
        class="k-item-footer"
    >
      <nav
          class="k-item-buttons"
          @click.stop
      >
        <!-- Status icon -->
        <k-status-icon
            v-if="flag"
            v-bind="flag"
        />

        <!-- Options -->
        <slot name="options">
          <k-options-dropdown
              v-if="options"
              :options="options"
              class="k-item-options-dropdown"
              @option="onOption"
          />
        </slot>
      </nav>
    </footer>
  </article>
</template>

<script>
export default {
  extends: 'k-item',
  props: {
    id: String,
    resizable: Boolean,
    disabled: Boolean
  },
  computed: {
    /**
     * From k-item
     * No image will be shown otherwise, even with 'extends'
     * @returns {boolean}
     */
    hasFigure() {
      return this.image !== false && Object.keys(this.image).length > 0;
    },
    title() {
      return this.text || "-";
    }
  },
}
</script>