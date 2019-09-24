<template>
  <span class="k-button clip" aria-hidden="true">
    <img @click="open"  src="../../assets/clip.png" alt="Clip" class="clipicon" />
  </span>
</template>`

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
        cursor: pointer;
        padding: 5px;
    }

    .clip:hover {
        background: #eee;
    }

    .clipicon {
        width: 2em;
        height: 2em;
    }
</style>