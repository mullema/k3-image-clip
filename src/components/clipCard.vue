<template>
    <figure class="k-card" v-on="$listeners">
        <k-sort-handle class="native" v-if="sortable" />
        <k-clip-handle v-if="resizable" @clicked="openClipDialog" />

        <component :is="wrapper" :to="link" :target="target">
            <k-image
                v-if="image && image.url"
                :src="image.url"
                :ratio="image.ratio || '3/2'"
                :back="image.back || 'black'"
                :cover="image.cover"
                class="k-card-image"
            />
            <span v-else :style="'padding-bottom:' + ratioPadding" class="k-card-icon">
                <k-icon v-bind="icon" />
            </span>
            <figcaption class="k-card-content">
                <span :data-noinfo="!info" class="k-card-text">{{ text }}</span>
                <span v-if="info" class="k-card-info" v-html="info" />
            </figcaption>
        </component>

        <nav class="k-card-options">
            <k-button
                v-if="flag"
                v-bind="flag"
                class="k-card-options-button"
                @click="flag.click"
            />
            <slot name="options">
                <k-button
                    v-if="options"
                    :tooltip="$t('options')"
                    icon="dots"
                    class="k-card-options-button"
                    @click.stop="$refs.dropdown.toggle()"
                />
                <k-dropdown-content
                    ref="dropdown"
                    :options="options"
                    class="k-card-options-dropdown"
                    align="right"
                    @action="$emit('action', $event)"
                />
            </slot>
        </nav>
    </figure>
</template>

<script>
    export default {
        extends: 'k-card',
        props: {
            id: String,
            resizable: Boolean
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