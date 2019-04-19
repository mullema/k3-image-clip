<template>
    <div v-if="isOpen" class="k-dialog" @click="cancel">
        <div :data-size="size" class="k-dialog-box" :style="dialog_width" @click.stop>
            <div v-if="notification" :data-theme="notification.type" class="k-dialog-notification">
                <p>{{ notification.message }}</p>
                <k-button icon="cancel" @click="notification = null" />
            </div>
            <div class="k-dialog-body" v-if="image">

                <img :src="image.url" id="croppr" />

            </div>
            <footer class="k-dialog-footer">
                <slot name="footer">
                    <k-button-group>
                        <k-button icon="cancel" class="k-dialog-button-cancel" @click="cancel">
                            {{ $t("cancel") }}
                        </k-button>
                        <k-button
                                :icon="icon"
                                :theme="theme"
                                class="k-dialog-button-submit"
                                @click="submit"
                        >
                            {{ button || $t("confirm") }}
                        </k-button>
                    </k-button-group>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
    import Croppr from "../facade/CropprFacade.js";

    export default {
        extends: 'k-dialog',
        props: {
            image: {
                type: Object,
                default: null
            },
            clip: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                cropprInstance: null,
                dialog_width: null
            }
        },
        mounted() {
          console.log(this.$props)
        },
        watch: {
            isOpen: function (newVal, oldVal) {
                if (newVal === true) {
                    this.setDialogWidth();
                    // resize dialog opened
                    this.$nextTick(() => {
                        let el = document.getElementById('croppr');

                        try {
                            this.cropprInstance = new Croppr({
                                el: el,
                                original_dimensions: this.image.dimensions,
                                clip: this.clip,
                                saved: this.image.clip
                            });
                        }
                        catch(error) {
                            this.cancel();
                            console.error(this.image.id + ': ' + error.message);
                            this.$store.dispatch("notification/error", error.message);
                        }
                    });
                }
            }
        },
        methods: {
            submit() {
                this.$emit("submit", {
                    id: this.image.id,
                    clip: this.cropprInstance.getCropArea()
                });
                this.close();
            },
            setDialogWidth() {
                let viewportWidth = window.innerWidth;

                if (this.image.dimensions.width > this.image.dimensions.height) {
                    // landscape
                    this.dialog_width = (viewportWidth > this.image.dimensions.width) ? "width: " + this.image.dimensions.width + "px;" : "width: 90vw;";
                }
                else {
                    // portrait + square
                    let largeDialog = 40 * parseInt(getComputedStyle(document.documentElement).fontSize); // rem to px conversion
                    this.dialog_width = (largeDialog > this.image.dimensions.width) ? "width: " + this.image.dimensions.width + "px;" : null;
                }
            }
        }
    }
</script>

<style>
    .croppr-container * {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    .croppr-container img {
        vertical-align: middle;
        max-width: 100%;
    }

    .croppr {
        position: relative;
        display: inline-block;
    }

    .croppr-overlay {
        background: rgba(0,0,0,0.5);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        cursor: crosshair;
    }

    .croppr-region {
        border: 1px dashed rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 3;
        cursor: move;
        top: 0;
    }

    .croppr-imageClipped {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        pointer-events: none;
    }

    .croppr-handle {
        border: 1px solid black;
        background-color: white;
        width: 10px;
        height: 10px;
        position: absolute;
        z-index: 4;
        top: 0;
    }
</style>