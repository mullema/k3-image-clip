panel.plugin('moeli/team', {
    fields: {
        'image-clip': {
            extends: 'k-files-field',
            computed: {
                elements() {
                    const layouts = {
                        cards: {
                            list: "k-cards",
                            item: "k-clip-card"
                        },
                        list: {
                            list: "k-list",
                            item: "k-list-item"
                        }
                    };
                    if (layouts[this.layout]) {
                        return layouts[this.layout];
                    }
                    return layouts["list"];
                },
            },
            template: `
                <template>
                  <k-field v-bind="$props" class="k-files-field">
                    <k-button
                      v-if="more"
                      slot="options"
                      icon="add"
                      @click="open"
                    >
                      {{ $t('select') }}
                    </k-button>
                    <template v-if="selected.length">
                      <k-draggable
                        :element="elements.list"
                        :list="selected"
                        :data-size="size"
                        :handle="true"
                        @end="onInput"
                      >                                                   
                        <component
                          v-for="(file, index) in selected"
                          :is="elements.item"
                          :key="file.filename"
                          :sortable="selected.length > 1"
                          :text="file.text"
                          :info="file.info"
                          :image="file.image"
                          :icon="file.icon"
                        >
                          <k-button
                            slot="options"
                            :tooltip="$t('remove')"
                            icon="remove"
                            @click="remove(index)"
                          />
                       
                        </component>
                      </k-draggable>
                    </template>
                    <k-empty
                      v-else
                      :layout="layout"
                      icon="image"
                      @click="open"
                    >
                      {{ empty || $t('field.files.empty') }}
                    </k-empty>
                    <k-files-dialog ref="selector" @submit="select" />
                  </k-field>
                </template>
            `
        }
    },
    components: {
        'k-clip-card': {
            extends: 'k-card',
            methods: {
               openDialog: function () {
                   this.$refs.clip.open();
               }
            },
            template: `
            <template>
              <figure class="k-card" v-on="$listeners">
                <k-sort-handle class="native" v-if="sortable" />
                <k-clip-handle class="clip" @click="openDialog" /> <!-- todo -->
                <component :is="wrapper" :to="link" :target="target">
                  <k-image
                    v-if="image && image.url"
                    :src="image.url"
                    :ratio="image.ratio || '3/2'"
                    :back="image.back || 'black'"
                    :cover="image.cover"
                    class="k-card-image"
                    @click="$refs.clip.open()"
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
                <k-dialog ref="clip" size="large">
                    <k-clip-dialog />
                </k-dialog>
              </figure>
            </template>
            `
        },
        'k-clip-handle': {
            extends: 'k-sort-handle',
            template: `
            <template>
              <span class="k-sort-handle" aria-hidden="true">
                <img src="../media/plugins/mullema/k3-image-clip/clip.png" />
              </span>
            </template>`
        },
        'k-clip-dialog': {
            props: {
               ref: String
            },
            template: `
              <template>
                <k-text>
                  Do you really want to delete the user:<br>
                  <strong>bastian</strong>?
                </k-text>
              </template>
            
              <template slot="footer">
                <k-button-group>
                  <k-button icon="times" @click="$refs.dialog.close()">Cancel</k-button>
                  <k-button icon="trash" theme="negative" @click="$refs.dialog.close()">Delete</k-button>
                </k-button-group>
              </template>
            `
        }
    }
});