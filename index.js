!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){"use strict";var t=function(t,i,e,n,o,s,a,r,h,l){"boolean"!=typeof a&&(h=r,r=a,a=!1);var d,c="function"==typeof e?e.options:e;if(t&&t.render&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0,o&&(c.functional=!0)),n&&(c._scopeId=n),s?(d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,h(t)),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=d):i&&(d=a?function(){i.call(this,l(this.$root.$options.shadowRoot))}:function(t){i.call(this,r(t))}),d)if(c.functional){var u=c.render;c.render=function(t,i){return d.call(i),u(t,i)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,d):[d]}return e},i=t({render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("k-field",t._b({staticClass:"k-files-field"},"k-field",t.$props,!1),[t.more&&!t.disabled?e("template",{slot:"options"},[e("k-button-group",{staticClass:"k-field-options"},[t.uploads?[e("k-dropdown",[e("k-button",{ref:"pickerToggle",staticClass:"k-field-options-button",attrs:{icon:"add"},on:{click:function(i){return t.$refs.picker.toggle()}}},[t._v("\n                        "+t._s(t.$t("add"))+"\n                    ")]),t._v(" "),e("k-dropdown-content",{ref:"picker",attrs:{align:"right"}},[e("k-dropdown-item",{attrs:{icon:"check"},on:{click:t.open}},[t._v(t._s(t.$t("select")))]),t._v(" "),e("k-dropdown-item",{attrs:{icon:"upload"},on:{click:t.upload}},[t._v(t._s(t.$t("upload")))])],1)],1)]:[e("k-button",{staticClass:"k-field-options-button",attrs:{icon:"add"},on:{click:t.open}},[t._v(t._s(t.$t("add")))])]],2)],1):t._e(),t._v(" "),t.selected.length?[e("k-draggable",{attrs:{element:t.elements.list,list:t.selected,"data-size":t.size,handle:!0,"data-invalid":t.isInvalid},on:{end:t.onInput}},t._l(t.selected,function(i,n){return e(t.elements.item,{key:i.filename,tag:"component",attrs:{sortable:!t.disabled&&t.selected.length>1,text:i.text,link:i.link,info:i.info,image:i.image,icon:i.icon,id:i.id,resizable:i.resizable,disabled:i.disabled},on:{openclipdialog:t.openClipDialog}},[t.disabled?t._e():e("k-button",{attrs:{slot:"options",tooltip:t.$t("remove"),icon:"remove"},on:{click:function(i){return t.remove(n)}},slot:"options"})],1)}),1)]:e("k-empty",{attrs:{layout:t.layout,icon:"image","data-invalid":t.isInvalid},on:{click:t.open}},[t._v("\n        "+t._s(t.empty||t.$t("field.files.empty"))+"\n    ")]),t._v(" "),e("k-files-dialog",{ref:"selector",on:{submit:t.select}}),t._v(" "),e("k-upload",{ref:"fileUpload",on:{success:t.selectUpload}}),t._v(" "),e("k-clip-dialog",{ref:"clip",attrs:{size:"large",image:t.clip_image,clip:t.clip},on:{submit:t.clippedArea}})],2)},staticRenderFns:[]},void 0,{extends:"k-files-field",props:{clip:{type:Object,default:null}},data:function(){return{clip_image:{}}},computed:{elements:function(){var t={cards:{list:"k-cards",item:"k-clip-card"},list:{list:"k-list",item:"k-clip-list-item"}};return t[this.layout]?t[this.layout]:t.list}},methods:{openClipDialog:function(t){this.clip_image=this.value.find(function(i){return i.id===t}),this.$refs.clip.open()},clippedArea:function(t){this.clip_image.clip=t.clip,this.onInput(),this.getPreview(t.id,t.clip)},getPreview:function(t,i){var e=this;this.$api.post(this.endpoints.field+"/preview",{id:t,width:i.width,height:i.height,top:i.top,left:i.left}).then(function(i){if(!i.image)throw new Error("image clip: no image for preview received.");var n=e.name,o=e.$store.state.content.current,s=e.$store.getters["content/values"](o)[n];s&&(s.find(function(i){return i.id===t}).image=i.image,e.$store.dispatch("content/update",[n,s,o]))}).catch(function(t){console.log(t)})}}},void 0,!1,void 0,void 0,void 0),e=t({render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("figure",t._g({staticClass:"k-card"},t.$listeners),[t.sortable?e("k-sort-handle"):t._e(),t._v(" "),t.resizable&&!t.disabled?e("k-clip-handle",{on:{clicked:t.openClipDialog}}):t._e(),t._v(" "),e(t.wrapper,{tag:"component",attrs:{to:t.link,target:t.target}},[t.imageOptions?e("k-image",t._b({staticClass:"k-card-image"},"k-image",t.imageOptions,!1)):e("span",{staticClass:"k-card-icon",style:"padding-bottom:"+t.ratioPadding},[e("k-icon",t._b({},"k-icon",t.icon,!1))],1),t._v(" "),e("figcaption",{staticClass:"k-card-content"},[e("span",{staticClass:"k-card-text",attrs:{"data-noinfo":!t.info}},[t._v(t._s(t.text))]),t._v(" "),t.info?e("span",{staticClass:"k-card-info",domProps:{innerHTML:t._s(t.info)}}):t._e()])],1),t._v(" "),e("nav",{staticClass:"k-card-options"},[t.flag?e("k-button",t._b({staticClass:"k-card-options-button",on:{click:t.flag.click}},"k-button",t.flag,!1)):t._e(),t._v(" "),t._t("options",[t.options?e("k-button",{staticClass:"k-card-options-button",attrs:{tooltip:t.$t("options"),icon:"dots"},on:{click:function(i){return i.stopPropagation(),t.$refs.dropdown.toggle()}}}):t._e(),t._v(" "),e("k-dropdown-content",{ref:"dropdown",staticClass:"k-card-options-dropdown",attrs:{options:t.options,align:"right"},on:{action:function(i){return t.$emit("action",i)}}})])],2)],1)},staticRenderFns:[]},void 0,{extends:"k-card",props:{id:String,resizable:Boolean,disabled:Boolean},methods:{openClipDialog:function(){this.$emit("openclipdialog",this.id)}}},"data-v-290c02b0",!1,void 0,void 0,void 0),n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAMFBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPzX0yTAAAAD3RSTlMAQIDAEPDQYLAgoFBwMJALzXfXAAAAsElEQVRYw+3TPQoCMRCG4RgXVEQwrVXwFhbilt7AQu+QvYl7BQ9h72XshUUtP+NPQImBDAq7Webtn2I+GMFxXG1JVAzaDjJlm+CivMrvoINQOhnwSPpHG2jarAsGDH4BOREs1zQwMpiRwB44HwhAwlaV0SDb4t5GiOEqCvTxbG5lEQO6eHUErtHAVVDBKU3Qm76lG/MPH2CnbHkIhBonAwbKy7ijY3OzMmg74Djuj90AekzAtvxv03QAAAAASUVORK5CYII=",o=t({render:function(){var t=this.$createElement,i=this._self._c||t;return i("span",{staticClass:"k-sort-handle clip",attrs:{"aria-hidden":"true"}},[i("img",{staticClass:"clipicon",attrs:{src:n,alt:"Clip"},on:{click:this.open}})])},staticRenderFns:[]},void 0,{extends:"k-sort-handle",methods:{open:function(){this.$emit("clicked")}}},"data-v-c59f6268",!1,void 0,void 0,void 0),s=t({render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e(t.element,t._g({tag:"component",staticClass:"k-list-item"},t.$listeners),[t.sortable?e("k-sort-handle"):t._e(),t._v(" "),e("k-link",{directives:[{name:"tab",rawName:"v-tab"}],staticClass:"k-list-item-content",attrs:{to:t.link,target:t.target}},[e("span",{staticClass:"k-list-item-image"},[t.imageOptions?e("k-image",t._b({},"k-image",t.imageOptions,!1)):e("k-icon",t._b({},"k-icon",t.icon,!1))],1),t._v(" "),e("span",{staticClass:"k-list-item-text"},[e("em",[t._v(t._s(t.text))]),t._v(" "),t.info?e("small",{domProps:{innerHTML:t._s(t.info)}}):t._e()])]),t._v(" "),e("nav",{staticClass:"k-list-item-options"},[t.resizable&&!t.disabled?e("k-clip-button",{on:{clicked:t.openClipDialog}}):t._e(),t._v(" "),t._t("options",[t.flag?e("k-button",t._b({on:{click:t.flag.click}},"k-button",t.flag,!1)):t._e(),t._v(" "),t.options?e("k-button",{staticClass:"k-list-item-toggle",attrs:{tooltip:t.$t("options"),icon:"dots",alt:"Options"},on:{click:function(i){return i.stopPropagation(),t.$refs.options.toggle()}}}):t._e(),t._v(" "),e("k-dropdown-content",{ref:"options",attrs:{options:t.options,align:"right"},on:{action:function(i){return t.$emit("action",i)}}})])],2)],1)},staticRenderFns:[]},void 0,{extends:"k-list-item",props:{id:String,resizable:Boolean,disabled:Boolean},methods:{openClipDialog:function(){this.$emit("openclipdialog",this.id)}}},"data-v-9cf224f4",!1,void 0,void 0,void 0),a=t({render:function(){var t=this.$createElement,i=this._self._c||t;return i("span",{staticClass:"k-button clip",attrs:{"aria-hidden":"true"}},[i("img",{staticClass:"clipicon",attrs:{src:n,alt:"Clip"},on:{click:this.open}})])},staticRenderFns:[]},void 0,{extends:"k-sort-handle",methods:{open:function(){this.$emit("clicked")}}},"data-v-7d15b97a",!1,void 0,void 0,void 0);function r(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var h,l=(function(t,i){t.exports=function(){(function(){for(var t=0,i=["ms","moz","webkit","o"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,e){var n=(new Date).getTime(),o=Math.max(0,16-(n-t)),s=window.setTimeout(function(){i(n+o)},o);return t=n+o,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})})(),function(){if("function"==typeof window.CustomEvent)return!1;function t(t,i){i=i||{bubbles:!1,cancelable:!1,detail:void 0};var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,i.bubbles,i.cancelable,i.detail),e}t.prototype=window.Event.prototype,window.CustomEvent=t}(),function(t){try{return new CustomEvent("test"),!1}catch(t){}function i(i,e){e=e||{bubbles:!1,cancelable:!1};var n=document.createEvent("MouseEvent");return n.initMouseEvent(i,e.bubbles,e.cancelable,t,0,0,0,0,0,!1,!1,!1,!1,0,null),n}i.prototype=Event.prototype,t.MouseEvent=i}(window);var t=function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")},i=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),e=function t(i,e,n){null===i&&(i=Function.prototype);var o=Object.getOwnPropertyDescriptor(i,e);if(void 0===o){var s=Object.getPrototypeOf(i);return null===s?void 0:t(s,e,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},n=function(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i},o=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],n=!0,o=!1,s=void 0;try{for(var a,r=t[Symbol.iterator]();!(n=(a=r.next()).done)&&(e.push(a.value),!i||e.length!==i);n=!0);}catch(t){o=!0,s=t}finally{try{!n&&r.return&&r.return()}finally{if(o)throw s}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},s=function i(e,n,o,s){t(this,i);var a=this;function r(t){t.stopPropagation(),document.removeEventListener("mouseup",r),document.removeEventListener("mousemove",h),a.eventBus.dispatchEvent(new CustomEvent("handleend",{detail:{handle:a}}))}function h(t){t.stopPropagation(),a.eventBus.dispatchEvent(new CustomEvent("handlemove",{detail:{mouseX:t.clientX,mouseY:t.clientY}}))}this.position=e,this.constraints=n,this.cursor=o,this.eventBus=s,this.el=document.createElement("div"),this.el.className="croppr-handle",this.el.style.cursor=o,this.el.addEventListener("mousedown",function(t){t.stopPropagation(),document.addEventListener("mouseup",r),document.addEventListener("mousemove",h),a.eventBus.dispatchEvent(new CustomEvent("handlestart",{detail:{handle:a}}))})},a=function(){function e(i,n,o,s){t(this,e),this.x1=i,this.y1=n,this.x2=o,this.y2=s}return i(e,[{key:"set",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return this.x1=null==t?this.x1:t,this.y1=null==i?this.y1:i,this.x2=null==e?this.x2:e,this.y2=null==n?this.y2:n,this}},{key:"width",value:function(){return Math.abs(this.x2-this.x1)}},{key:"height",value:function(){return Math.abs(this.y2-this.y1)}},{key:"resize",value:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,0],n=this.x1+this.width()*e[0],o=this.y1+this.height()*e[1];return this.x1=n-t*e[0],this.y1=o-i*e[1],this.x2=this.x1+t,this.y2=this.y1+i,this}},{key:"scale",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[0,0],e=this.width()*t,n=this.height()*t;return this.resize(e,n,i),this}},{key:"move",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=this.width(),n=this.height();return t=null===t?this.x1:t,i=null===i?this.y1:i,this.x1=t,this.y1=i,this.x2=t+e,this.y2=i+n,this}},{key:"getRelativePoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0],i=this.width()*t[0],e=this.height()*t[1];return[i,e]}},{key:"getAbsolutePoint",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0],i=this.x1+this.width()*t[0],e=this.y1+this.height()*t[1];return[i,e]}},{key:"constrainToRatio",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[0,0],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"height";if(null!==t){switch(this.width(),this.height(),e){case"height":this.resize(this.width(),this.width()*t,i);break;case"width":this.resize(1*this.height()/t,this.height(),i);break;default:this.resize(this.width(),this.width()*t,i)}return this}}},{key:"constrainToBoundary",value:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,0],n=this.getAbsolutePoint(e),s=o(n,2),a=s[0],r=s[1],h=a,l=r,d=t-a,c=i-r,u=-2*e[0]+1,p=-2*e[1]+1,v=null,m=null;switch(u){case-1:v=h;break;case 0:v=2*Math.min(h,d);break;case 1:v=d}switch(p){case-1:m=l;break;case 0:m=2*Math.min(l,c);break;case 1:m=c}if(this.width()>v){var g=v/this.width();this.scale(g,e)}if(this.height()>m){var f=m/this.height();this.scale(f,e)}return this}},{key:"constrainToSize",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[0,0],s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;if(s&&(s>1?(t=1*i/s,n=e*s):s<1&&(i=t*s,e=1*n/s)),t&&this.width()>t){var a=t,r=null===s?this.height():i;this.resize(a,r,o)}if(i&&this.height()>i){var h=null===s?this.width():t,l=i;this.resize(h,l,o)}if(e&&this.width()<e){var d=e,c=null===s?this.height():n;this.resize(d,c,o)}if(n&&this.height()<n){var u=null===s?this.width():e,p=n;this.resize(u,p,o)}return this}}]),e}();function r(t){t.preventDefault();var i=t.changedTouches[0];i.target.dispatchEvent(new MouseEvent({touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"}[t.type],{bubbles:!0,cancelable:!0,view:window,clientX:i.clientX,clientY:i.clientY,screenX:i.screenX,screenY:i.screenY}))}var h=[{position:[0,0],constraints:[1,0,0,1],cursor:"nw-resize"},{position:[.5,0],constraints:[1,0,0,0],cursor:"n-resize"},{position:[1,0],constraints:[1,1,0,0],cursor:"ne-resize"},{position:[1,.5],constraints:[0,1,0,0],cursor:"e-resize"},{position:[1,1],constraints:[0,1,1,0],cursor:"se-resize"},{position:[.5,1],constraints:[0,0,1,0],cursor:"s-resize"},{position:[0,1],constraints:[0,0,1,1],cursor:"sw-resize"},{position:[0,.5],constraints:[0,0,0,1],cursor:"w-resize"}];function l(t,i){return Number(Math.round(t+"e"+i)+"e-"+i)}return function(o){function s(i,e){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t(this,s),n(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,i,e,o))}return function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)}(s,o),i(s,[{key:"getValue",value:function(t){return e(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"getValue",this).call(this,t)}},{key:"setImage",value:function(t){return e(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"setImage",this).call(this,t)}},{key:"destroy",value:function(){return e(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"destroy",this).call(this)}},{key:"moveTo",value:function(t,i){return this.box.move(t,i),this.redraw(),null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue()),this}},{key:"resizeTo",value:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[.5,.5];return this.box.resize(t,i,e),this.redraw(),null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue()),this}},{key:"scaleBy",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[.5,.5];return this.box.scale(t,i),this.redraw(),null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue()),this}},{key:"reset",value:function(){return this.box=this.initializeBox(this.options),this.redraw(),null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue()),this}}]),s}(function(){function e(i,n){var o=this,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t(this,e),this.options=e.parseOptions(n||{}),!i.nodeName&&null==(i=document.querySelector(i)))throw"Unable to find element.";if(!i.getAttribute("src"))throw"Image src not provided.";this._initialized=!1,this._restore={parent:i.parentNode,element:i},s||(0===i.width||0===i.height?i.onload=function(){o.initialize(i)}:this.initialize(i))}return i(e,[{key:"initialize",value:function(t){this.createDOM(t),this.options.convertToPixels(this.cropperEl),this.attachHandlerEvents(),this.attachRegionEvents(),this.attachOverlayEvents(),this.box=this.initializeBox(this.options),this.redraw(),this._initialized=!0,null!==this.options.onInitialize&&this.options.onInitialize(this)}},{key:"createDOM",value:function(t){var i;this.containerEl=document.createElement("div"),this.containerEl.className="croppr-container",this.eventBus=this.containerEl,(i=this.containerEl).addEventListener("touchstart",r),i.addEventListener("touchend",r),i.addEventListener("touchmove",r),this.cropperEl=document.createElement("div"),this.cropperEl.className="croppr",this.imageEl=document.createElement("img"),this.imageEl.setAttribute("src",t.getAttribute("src")),this.imageEl.setAttribute("alt",t.getAttribute("alt")),this.imageEl.className="croppr-image",this.imageClippedEl=this.imageEl.cloneNode(),this.imageClippedEl.className="croppr-imageClipped",this.regionEl=document.createElement("div"),this.regionEl.className="croppr-region",this.overlayEl=document.createElement("div"),this.overlayEl.className="croppr-overlay";var e=document.createElement("div");e.className="croppr-handleContainer",this.handles=[];for(var n=0;n<h.length;n++){var o=new s(h[n].position,h[n].constraints,h[n].cursor,this.eventBus);this.handles.push(o),e.appendChild(o.el)}this.cropperEl.appendChild(this.imageEl),this.cropperEl.appendChild(this.imageClippedEl),this.cropperEl.appendChild(this.regionEl),this.cropperEl.appendChild(this.overlayEl),this.cropperEl.appendChild(e),this.containerEl.appendChild(this.cropperEl),t.parentElement.replaceChild(this.containerEl,t)}},{key:"setImage",value:function(t){var i=this;return this.imageEl.onload=function(){i.box=i.initializeBox(i.options),i.redraw()},this.imageEl.src=t,this.imageClippedEl.src=t,this}},{key:"destroy",value:function(){this._restore.parent.replaceChild(this._restore.element,this.containerEl)}},{key:"initializeBox",value:function(t){var i=t.startSize.width,e=t.startSize.height,n=new a(0,0,i,e);n.constrainToRatio(t.aspectRatio,[.5,.5]);var o=t.minSize,s=t.maxSize;n.constrainToSize(s.width,s.height,o.width,o.height,[.5,.5],t.aspectRatio);var r=this.cropperEl.offsetWidth,h=this.cropperEl.offsetHeight;n.constrainToBoundary(r,h,[.5,.5]);var l=this.cropperEl.offsetWidth/2-n.width()/2,d=this.cropperEl.offsetHeight/2-n.height()/2;return n.move(l,d),n}},{key:"redraw",value:function(){var t=this,i=Math.round(this.box.width()),e=Math.round(this.box.height()),n=Math.round(this.box.x1),o=Math.round(this.box.y1),s=Math.round(this.box.x2),a=Math.round(this.box.y2);window.requestAnimationFrame(function(){t.regionEl.style.transform="translate("+n+"px, "+o+"px)",t.regionEl.style.width=i+"px",t.regionEl.style.height=e+"px",t.imageClippedEl.style.clip="rect("+o+"px, "+s+"px, "+a+"px, "+n+"px)";for(var r=t.box.getAbsolutePoint([.5,.5]),h=r[0]-t.cropperEl.offsetWidth/2>>31,l=r[1]-t.cropperEl.offsetHeight/2>>31,d=(h^l)+l+l+4,c=-2*d+8,u=0;u<t.handles.length;u++){var p=t.handles[u],v=p.el.offsetWidth,m=p.el.offsetHeight,g=n+i*p.position[0]-v/2,f=o+e*p.position[1]-m/2;p.el.style.transform="translate("+Math.round(g)+"px, "+Math.round(f)+"px)",p.el.style.zIndex=c==u?5:4}})}},{key:"attachHandlerEvents",value:function(){var t=this.eventBus;t.addEventListener("handlestart",this.onHandleMoveStart.bind(this)),t.addEventListener("handlemove",this.onHandleMoveMoving.bind(this)),t.addEventListener("handleend",this.onHandleMoveEnd.bind(this))}},{key:"attachRegionEvents",value:function(){var t=this.eventBus;function i(i){i.stopPropagation(),t.dispatchEvent(new CustomEvent("regionmove",{detail:{mouseX:i.clientX,mouseY:i.clientY}}))}function e(n){n.stopPropagation(),document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",i),t.dispatchEvent(new CustomEvent("regionend",{detail:{mouseX:n.clientX,mouseY:n.clientY}}))}this.regionEl.addEventListener("mousedown",function(n){n.stopPropagation(),document.addEventListener("mouseup",e),document.addEventListener("mousemove",i),t.dispatchEvent(new CustomEvent("regionstart",{detail:{mouseX:n.clientX,mouseY:n.clientY}}))}),t.addEventListener("regionstart",this.onRegionMoveStart.bind(this)),t.addEventListener("regionmove",this.onRegionMoveMoving.bind(this)),t.addEventListener("regionend",this.onRegionMoveEnd.bind(this))}},{key:"attachOverlayEvents",value:function(){var t=4,i=this,e=null;function n(t){t.stopPropagation(),i.eventBus.dispatchEvent(new CustomEvent("handlemove",{detail:{mouseX:t.clientX,mouseY:t.clientY}}))}function o(t){t.stopPropagation(),document.removeEventListener("mouseup",o),document.removeEventListener("mousemove",n),1!==i.box.width()||1!==i.box.height()?i.eventBus.dispatchEvent(new CustomEvent("handleend",{detail:{mouseX:t.clientX,mouseY:t.clientY}})):i.box=e}this.overlayEl.addEventListener("mousedown",function(s){s.stopPropagation(),document.addEventListener("mouseup",o),document.addEventListener("mousemove",n);var r=i.cropperEl.getBoundingClientRect(),h=s.clientX-r.left,l=s.clientY-r.top;e=i.box,i.box=new a(h,l,h+1,l+1),i.eventBus.dispatchEvent(new CustomEvent("handlestart",{detail:{handle:i.handles[t]}}))})}},{key:"onHandleMoveStart",value:function(t){var i=t.detail.handle,e=[1-i.position[0],1-i.position[1]],n=this.box.getAbsolutePoint(e),s=o(n,2),a=s[0],r=s[1];this.activeHandle={handle:i,originPoint:e,originX:a,originY:r},null!==this.options.onCropStart&&this.options.onCropStart(this.getValue())}},{key:"onHandleMoveMoving",value:function(t){var i=t.detail,e=i.mouseX,n=i.mouseY,o=this.cropperEl.getBoundingClientRect();e-=o.left,n-=o.top,e<0?e=0:e>o.width&&(e=o.width),n<0?n=0:n>o.height&&(n=o.height);var s=this.activeHandle.originPoint.slice(),r=this.activeHandle.originX,h=this.activeHandle.originY,l=this.activeHandle.handle,d=1===l.constraints[0],c=1===l.constraints[1],u=1===l.constraints[2],p=1===l.constraints[3],v=(p||c)&&(d||u),m=p||c?r:this.box.x1,g=p||c?r:this.box.x2,f=d||u?h:this.box.y1,w=d||u?h:this.box.y2;m=p?e:m,g=c?e:g,f=d?n:f,w=u?n:w;var _=!1,b=!1;if((p||c)&&(_=p?e>r:e<r),(d||u)&&(b=d?n>h:n<h),_){var E=m;m=g,g=E,s[0]=1-s[0]}if(b){var y=f;f=w,w=y,s[1]=1-s[1]}var x=new a(m,f,g,w);if(this.options.aspectRatio){var k=this.options.aspectRatio,C=!1;v?C=n>x.y1+k*x.width()||n<x.y2-k*x.width():(d||u)&&(C=!0);var z=C?"width":"height";x.constrainToRatio(k,s,z)}var M=this.cropperEl.offsetWidth,S=this.cropperEl.offsetHeight;x.constrainToBoundary(M,S,s);var A=this.options.minSize,R=this.options.maxSize;x.constrainToSize(R.width,R.height,A.width,A.height,s,this.options.aspectRatio),x.x1<0||x.y1<0||x.x2>Math.ceil(o.width)||x.y2>Math.ceil(o.height)||(this.box=x,this.redraw(),null!==this.options.onCropMove&&this.options.onCropMove(this.getValue()))}},{key:"onHandleMoveEnd",value:function(t){null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue())}},{key:"onRegionMoveStart",value:function(t){var i=t.detail,e=i.mouseX,n=i.mouseY,o=this.cropperEl.getBoundingClientRect();e-=o.left,n-=o.top,this.currentMove={offsetX:e-this.box.x1,offsetY:n-this.box.y1},null!==this.options.onCropStart&&this.options.onCropStart(this.getValue())}},{key:"onRegionMoveMoving",value:function(t){var i=t.detail,e=i.mouseX,n=i.mouseY,o=this.currentMove,s=o.offsetX,a=o.offsetY,r=this.cropperEl.getBoundingClientRect();e-=r.left,n-=r.top,this.box.move(e-s,n-a),this.box.x1<0&&this.box.move(0,null),this.box.x2>r.width&&this.box.move(r.width-this.box.width(),null),this.box.y1<0&&this.box.move(null,0),this.box.y2>r.height&&this.box.move(null,r.height-this.box.height()),this.redraw(),null!==this.options.onCropMove&&this.options.onCropMove(this.getValue())}},{key:"onRegionMoveEnd",value:function(t){null!==this.options.onCropEnd&&this.options.onCropEnd(this.getValue())}},{key:"getValue",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(null===t&&(t=this.options.returnMode),"real"==t){var i=this.imageEl.naturalWidth,e=this.imageEl.naturalHeight,n=this.imageEl.getBoundingClientRect(),o=n.width,s=n.height,a=i/o,r=e/s;return{x:Math.round(this.box.x1*a),y:Math.round(this.box.y1*r),width:Math.round(this.box.width()*a),height:Math.round(this.box.height()*r)}}if("ratio"==t){var h=this.imageEl.getBoundingClientRect(),d=h.width,c=h.height;return{x:l(this.box.x1/d,3),y:l(this.box.y1/c,3),width:l(this.box.width()/d,3),height:l(this.box.height()/c,3)}}if("raw"==t)return{x:Math.round(this.box.x1),y:Math.round(this.box.y1),width:Math.round(this.box.width()),height:Math.round(this.box.height())}}}],[{key:"parseOptions",value:function(t){var i={aspectRatio:null,maxSize:{width:null,height:null},minSize:{width:null,height:null},startSize:{width:100,height:100,unit:"%"},returnMode:"real",onInitialize:null,onCropStart:null,onCropMove:null,onCropEnd:null},e=null;void 0!==t.aspectRatio&&("number"==typeof t.aspectRatio?e=t.aspectRatio:t.aspectRatio instanceof Array&&(e=t.aspectRatio[1]/t.aspectRatio[0]));var n=null;void 0!==t.maxSize&&null!==t.maxSize&&(n={width:t.maxSize[0]||null,height:t.maxSize[1]||null,unit:t.maxSize[2]||"px"});var o=null;void 0!==t.minSize&&null!==t.minSize&&(o={width:t.minSize[0]||null,height:t.minSize[1]||null,unit:t.minSize[2]||"px"});var s=null;void 0!==t.startSize&&null!==t.startSize&&(s={width:t.startSize[0]||null,height:t.startSize[1]||null,unit:t.startSize[2]||"%"});var a=null;"function"==typeof t.onInitialize&&(a=t.onInitialize);var r=null;"function"==typeof t.onCropStart&&(r=t.onCropStart);var h=null;"function"==typeof t.onCropEnd&&(h=t.onCropEnd);var l=null;"function"==typeof t.onUpdate&&(console.warn("Croppr.js: `onUpdate` is deprecated and will be removed in the next major release. Please use `onCropMove` or `onCropEnd` instead."),l=t.onUpdate),"function"==typeof t.onCropMove&&(l=t.onCropMove);var d=null;if(void 0!==t.returnMode){var c=t.returnMode.toLowerCase();if(-1===["real","ratio","raw"].indexOf(c))throw"Invalid return mode.";d=c}var u=function(t,i){return null!==t?t:i};return{aspectRatio:u(e,i.aspectRatio),maxSize:u(n,i.maxSize),minSize:u(o,i.minSize),startSize:u(s,i.startSize),returnMode:u(d,i.returnMode),onInitialize:u(a,i.onInitialize),onCropStart:u(r,i.onCropStart),onCropMove:u(l,i.onCropMove),onCropEnd:u(h,i.onCropEnd),convertToPixels:function(t){for(var i=t.offsetWidth,e=t.offsetHeight,n=["maxSize","minSize","startSize"],o=0;o<n.length;o++){var s=n[o];null!==this[s]&&("%"==this[s].unit&&(null!==this[s].width&&(this[s].width=this[s].width/100*i),null!==this[s].height&&(this[s].height=this[s].height/100*e)),delete this[s].unit)}}}}}]),e}())}()}(h={exports:{}},h.exports),h.exports);function d(t){var i=t.srcWidth,e=t.srcHeight,n=t.maxWidth,o=t.maxHeight,s=Math.min(n/i,o/e);return{width:i*s,height:e*s}}var c=function(){function t(i){var e=i.el,n=i.original_dimensions,o=i.saved,s=i.clip,a=i.events;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.original_dimensions=n,this.saved=o,this.min_width=s?s.minwidth:null,this.min_height=s?s.minheight:null,this.max_width=s?s.maxwidth:null,this.max_height=s?s.maxheight:null,this.limit_width=null,this.limit_height=null,this.ratio=s?s.ratio:null,this.events=a,this.validate(),this.cropInstance=this.init()}var i,e,n;return i=t,(e=[{key:"reset",value:function(t){var i=t.position;this.cropInstance.destroy(),this.saved=i,this.cropInstance=this.init()}},{key:"init",value:function(){var t=this,i=Object.assign({returnMode:"raw",onInitialize:function(i){document.getElementsByClassName("croppr-image")[0].addEventListener("load",function(i){t.image=i.target,t.factor_w=t.original_dimensions.width/i.target.clientWidth,t.factor_h=t.original_dimensions.height/i.target.clientHeight,t.setStartPosition()},!1)}},this.events);return this.min_width&&this.min_height&&(i.aspectRatio="fixed"===this.ratio?this.min_height/this.min_width:null,i.minSize=[this.min_width,this.min_height,"px"],this.limit_width=this.min_width,this.limit_height=this.min_height),this.max_width&&this.max_height&&(i.aspectRatio="fixed"===this.ratio?this.max_height/this.max_width:null,i.maxSize=[this.max_width,this.max_height,"px"],this.limit_width=this.max_width,this.limit_height=this.max_height),new l(this.el,i)}},{key:"getCropArea",value:function(){var t=this.cropInstance.getValue(),i={width:this.roundSize(t.width*this.factor_w,this.limit_width),height:this.roundSize(t.height*this.factor_h,this.limit_height)};return i.left=this.adjustPosition(t.x*this.factor_w,i.width,this.original_dimensions.width),i.top=this.adjustPosition(t.y*this.factor_h,i.height,this.original_dimensions.height),i}},{key:"setStartPosition",value:function(){var t={width:10,height:10};if(this.max_width&&this.max_height&&(this.cropInstance.options.maxSize=t={width:this.max_width/this.factor_w,height:this.max_height/this.factor_h}),this.min_width&&this.min_height&&(this.cropInstance.options.minSize=t={width:this.min_width/this.factor_w,height:this.min_height/this.factor_h}),this.saved){var i={width:Math.round(this.saved.width/this.factor_w),height:Math.round(this.saved.height/this.factor_h),left:Math.round(this.saved.left/this.factor_w),top:Math.round(this.saved.top/this.factor_h)};this.cropInstance.resizeTo(i.width,i.height),this.cropInstance.moveTo(i.left,i.top)}else{var e=d({srcWidth:t.width,srcHeight:t.height,maxWidth:this.original_dimensions.width,maxHeight:this.original_dimensions.height});t={width:e.width/this.factor_w,height:e.height/this.factor_h},this.cropInstance.resizeTo(t.width,t.height),this.cropInstance.moveTo(0,0)}}},{key:"validate",value:function(){if(this.min_width&&this.original_dimensions.width<this.min_width)throw new Error("Image width (".concat(this.original_dimensions.width,"px) must be at least ").concat(this.min_width,"px"));if(this.min_height&&this.original_dimensions.height<this.min_height)throw new Error("Image height (".concat(this.original_dimensions.height,"px) must be at least ").concat(this.min_height,"px"));if(this.min_width&&this.min_height&&this.max_width&&this.max_height&&"fixed"===this.ratio&&this.min_width/this.min_height!=this.max_width/this.max_height)throw new Error("Ratio must be same for min and max")}},{key:"roundSize",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return i&&i-t>=-1&&i-t<=1?i:Math.round(t)}},{key:"adjustPosition",value:function(t,i,e){return t+i>e?e-i:Math.round(t)}}])&&r(i.prototype,e),n&&r(i,n),t}();var u=t({render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.isOpen?e("div",{staticClass:"k-dialog",on:{click:t.cancel}},[e("div",{staticClass:"k-dialog-box",style:t.dialog_width,attrs:{"data-size":t.size},on:{click:function(t){t.stopPropagation()}}},[t.notification?e("div",{staticClass:"k-dialog-notification",attrs:{"data-theme":t.notification.type}},[e("p",[t._v(t._s(t.notification.message))]),t._v(" "),e("k-button",{attrs:{icon:"cancel"},on:{click:function(i){t.notification=null}}})],1):t._e(),t._v(" "),t.image?e("div",{staticClass:"k-dialog-body"},[t.spinner?e("div",{staticClass:"preload"},[t._m(0),t._v(" "),e("footer",{staticClass:"preload-dialog-footer"},[t._t("footer",[e("k-button-group",[e("k-button",{staticClass:"k-dialog-button-cancel",attrs:{icon:"cancel"},on:{click:t.cancel}},[t._v("\n                                "+t._s(t.$t("cancel"))+"\n                            ")])],1)])],2)]):t._e(),t._v(" "),e("img",{attrs:{src:t.image.url,id:"croppr"}})]):t._e(),t._v(" "),e("footer",{staticClass:"k-dialog-footer"},[t._t("footer",[e("k-button-group",[e("k-button",{staticClass:"k-dialog-button-cancel",attrs:{icon:"cancel"},on:{click:t.cancel}},[t._v("\n                        "+t._s(t.$t("cancel"))+"\n                    ")]),t._v(" "),e("k-button",{staticClass:"k-dialog-button-submit",attrs:{icon:t.icon,theme:t.theme},on:{click:t.submit}},[t._v("\n                        "+t._s(t.button||t.$t("confirm"))+"\n                    ")])],1)])],2)])]):t._e()},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"spinner"},[i("div",{staticClass:"bounce1"}),this._v(" "),i("div",{staticClass:"bounce2"}),this._v(" "),i("div",{staticClass:"bounce3"})])}]},void 0,{extends:"k-dialog",props:{image:{type:Object,default:null},clip:{type:Object,default:null}},data:function(){return{cropprFacade:null,dialog_width:null,spinner:!0,freezeDialog:!1,was_moved:!1}},watch:{isOpen:function(t,i){var e=this;!0===t?(this.setDialogWidth(),this.showSpinner(),this.$nextTick(function(){var t=document.getElementById("croppr");t.addEventListener("load",e.hideSpinner,!1),t.complete&&e.hideSpinner();try{e.cropprFacade=new c({el:t,original_dimensions:e.image.dimensions,clip:e.clip,saved:e.image.clip,events:{onCropStart:function(){e.freezeDialog=!0,e.was_moved=!0},onCropEnd:function(){setTimeout(function(){e.freezeDialog=!1},200)}}}),window.addEventListener("resize",e.showSpinner,!1),window.addEventListener("resize",e.resizeDialog,!1)}catch(t){e.cancel(),console.error(e.image.id+": "+t.message),e.$store.dispatch("notification/error",t.message)}})):(window.removeEventListener("resize",this.showSpinner,!1),window.removeEventListener("resize",this.resizeDialog,!1))}},methods:{cancel:function(){this.freezeDialog||(this.$emit("cancel"),this.close())},remToPx:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:1)*parseInt(getComputedStyle(document.documentElement).fontSize)},submit:function(){this.was_moved&&(this.$emit("submit",{id:this.image.id,clip:this.cropprFacade.getCropArea()}),this.was_moved=!1),this.close()},setDialogWidth:function(){var t=window.innerWidth-this.remToPx(6),i=window.innerHeight-this.remToPx(12),e=d({srcWidth:this.image.dimensions.width,srcHeight:this.image.dimensions.height,maxWidth:t,maxHeight:i}),n=this.image.dimensions.width;(this.image.dimensions.width>t||this.image.dimensions.height>i)&&(n=e.width),this.dialog_width="width: "+n+"px;"},resizeDialog:function(t){var i,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;return function(){for(var n=this,o=arguments.length,s=new Array(o),a=0;a<o;a++)s[a]=arguments[a];window.clearTimeout(i),i=window.setTimeout(function(){t.apply(n,s)},e)}}(function(){this.setDialogWidth();var t=this.cropprFacade.getCropArea();this.cropprFacade.reset({position:t}),this.spinner=!1},500),hideSpinner:function(){this.spinner=!1},showSpinner:function(){!1===this.spinner&&(this.spinner=!0)}}},void 0,!1,void 0,void 0,void 0),p=t({},void 0,{extends:"k-files-field-preview"},"data-v-0ef04a10",void 0,void 0,void 0,void 0);panel.plugin("mullema/image-clip",{fields:{"image-clip":i},components:{"k-clip-card":e,"k-clip-handle":o,"k-clip-list-item":s,"k-clip-button":a,"k-clip-dialog":u,"k-image-clip-field-preview":p}})});
