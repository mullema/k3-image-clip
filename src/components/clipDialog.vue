<template>
    <div v-if="isOpen" class="k-dialog" @click="cancel">
        <div :data-size="size" class="k-dialog-box" :style="dialog_width" @click.stop>
            <div v-if="notification" :data-theme="notification.type" class="k-dialog-notification">
                <p>{{ notification.message }}</p>
                <k-button icon="cancel" @click="notification = null" />
            </div>
            <div class="k-dialog-body" v-if="image">

                <div class="preload" v-if="spinner">
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>

                    <footer class="preload-dialog-footer">
                        <slot name="footer">
                            <k-button-group>
                                <k-button icon="cancel" class="k-dialog-button-cancel" @click="cancel">
                                    {{ $t("cancel") }}
                                </k-button>
                            </k-button-group>
                        </slot>
                    </footer>
                </div>

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
    import aspectRatioFit from "../helpers/aspectRatioFit.js";
    import debounce from '../helpers/debounce.js';

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
                cropprFacade: null,
                dialog_width: null,
                spinner: true,
                freezeDialog: false,
                was_moved: false
            }
        },
        watch: {
            isOpen (newVal, oldVal) {
                if (newVal === true) {
                    this.setDialogWidth();
                    this.showSpinner();
                    // dialog opened
                    this.$nextTick(() => {
                        let el = document.getElementById('croppr');

                        el.addEventListener("load", this.hideSpinner, false);
                        if (el.complete) { // if already in cache
                            this.hideSpinner();
                        }

                        try {
                            this.cropprFacade = new Croppr({
                                el: el,
                                original_dimensions: this.image.dimensions,
                                clip: this.clip,
                                saved: this.image.clip,
                                events: {
                                    // prevent dialog from closing when dragging mouse outside image
                                    onCropStart: () => {
                                        this.freezeDialog = true;
                                        this.was_moved = true;
                                    },
                                    onCropEnd: () => {
                                        setTimeout(() => {
                                            this.freezeDialog = false;
                                        }, 200);
                                    }
                                }
                            });

                            // on window resize show spinner and reset Croppr Instance
                            window.addEventListener("resize", this.showSpinner, false);
                            window.addEventListener("resize", this.resizeDialog, false);
                        }
                        catch(error) {
                            this.cancel();
                            console.error(this.image.id + ': ' + error.message);
                            this.$store.dispatch("notification/error", error.message);
                        }
                    });
                }
                else {
                    window.removeEventListener("resize", this.showSpinner, false);
                    window.removeEventListener("resize", this.resizeDialog, false);
                }
            }
        },
        methods: {
            cancel() {
                // to prevent closing the dialog, when draging the mouse outside image
                if (this.freezeDialog) return;
                this.$emit("cancel");
                this.close();
            },
            remToPx(px = 1) {
                return px * parseInt(getComputedStyle(document.documentElement).fontSize);
            },
            submit() {
                if (this.was_moved) {
                    this.$emit("submit", {
                        id: this.image.id,
                        clip: this.cropprFacade.getCropArea()
                    });
                    this.was_moved = false;
                }
                this.close();
            },
            setDialogWidth() {
                let max_width = window.innerWidth - this.remToPx(6);
                let max_height = window.innerHeight - this.remToPx(12);

                let size = aspectRatioFit({
                    srcWidth: this.image.dimensions.width,
                    srcHeight: this.image.dimensions.height,
                    maxWidth: max_width,
                    maxHeight: max_height
                });

                let width = this.image.dimensions.width;
                if (this.image.dimensions.width > max_width || this.image.dimensions.height > max_height) {
                    width = size.width;
                }

                this.dialog_width = "width: " + width + "px;";
            },
            resizeDialog: debounce(function() {
                this.setDialogWidth();
                let last_known = this.cropprFacade.getCropArea();
                this.cropprFacade.reset({position: last_known});
                this.spinner = false;
            }, 500),
            hideSpinner: function() {
                this.spinner = false;
            },
            showSpinner: function() {
                if (this.spinner === false) {
                    this.spinner = true;
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

    .preload {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        background: #efefef;
    }

    .preload-dialog-footer {
        position: absolute;
        left: 1.5rem;
        bottom: 0;
    }

    .spinner {
        margin: auto 0;
        width: 70px;
        text-align: center;
    }

    .spinner > div {
        width: 18px;
        height: 18px;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% { -webkit-transform: scale(0) }
        40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        } 40% {
              -webkit-transform: scale(1.0);
              transform: scale(1.0);
          }
    }
</style>