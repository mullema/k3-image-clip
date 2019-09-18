<template>
    <component :is="element" class="k-list-item" v-on="$listeners">
        <k-sort-handle v-if="sortable" />
        <k-link
            v-tab
            :to="link"
            :target="target"
            class="k-list-item-content"
        >
          <span class="k-list-item-image">
            <k-image v-if="imageOptions" v-bind="imageOptions" />
            <k-icon v-else v-bind="icon" />
          </span>
            <span class="k-list-item-text">
                <em>{{ text }}</em>
                <small v-if="info" v-html="info" />
            </span>
        </k-link>
        <nav class="k-list-item-options">
            <k-clip-button v-if="resizable && !disabled" @clicked="openClipDialog" />
            <slot name="options">
                <k-button
                    v-if="flag"
                    v-bind="flag"
                    @click="flag.click"
                />
                <k-button
                    v-if="options"
                    :tooltip="$t('options')"
                    icon="dots"
                    alt="Options"
                    class="k-list-item-toggle"
                    @click.stop="$refs.options.toggle()"
                />
                <k-dropdown-content
                    ref="options"
                    :options="options"
                    align="right"
                    @action="$emit('action', $event)"
                />
            </slot>
        </nav>
    </component>
</template>

<script>
    export default {
        extends: 'k-list-item',
        props: {
            id: String,
            resizable: Boolean,
            disabled: Boolean
        },
        methods: {
            openClipDialog() {
                this.$emit('openclipdialog', this.id);
            }
        }
    }
</script>

<style scoped>

</style>