<template>
  <span class="k-sort-handle clip" aria-hidden="true">
    <img @click="open" src="../../assets/clip.png" alt="Clip" class="clipicon" />
  </span>
</template>

<script>
    export default {
        extends: 'k-sort-handle',
        methods: {
            open() {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped>
    .clip {
        left: 0.75rem;
        cursor: pointer;
    }

    .clip:hover {
        background: #ddd;
    }

    .clipicon {
        width: 2em;
        height: 2em;
    }
</style>