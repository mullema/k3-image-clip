<template>
  <span :class="`k-sort-handle k-item-sort-handle k-icon k-icon-sort clip-handle ${layout}-handle`" aria-hidden="true">
    <img @click="open" src="../../assets/clip.png" alt="Clip" class="clipicon"/>
  </span>
</template>

<script>
export default {
  extends: 'k-sort-handle',
  props: {
    layout: String
  },
  methods: {
    open () {
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
.clip-handle {
  left: auto !important;
  right: 0;
  cursor: crosshair;
  background: white;
}

.list-handle {
  margin: auto;
  left: 0 !important;
  top: 0;
  bottom: 0;
  text-align: center;
}

.clip-handle:hover {
  background: #ddd;
}

.clipicon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>