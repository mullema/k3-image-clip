import Croppr from 'croppr';

export default class {

    /**
     *
     * @param el
     * @param saved
     * @param min_width
     * @param min_height
     */
    constructor({el, original_dimensions, saved, min_width, min_height}) {
        this.cropInstance = null;
        this.el = el;
        this.original_dimensions = original_dimensions;
        this.saved = saved;
        this.min_width = min_width;
        this.min_height = min_height;

        this.validate();
        this.init();
    }

    validate(image) {
        if (this.min_width && this.original_dimensions.width < this.min_width) throw new Error('Image is smaller than min-width');
        if (this.min_height && this.original_dimensions.height < this.min_height) throw new Error('Image is smaller than min-height');

        // check max size
        // check min and max size same ratio
        // check saved inside original_dimensions
    }

    init () {
        let options = {
            returnMode: "raw",
            onInitialize: (instance) => {
                // i need image width for factor calculations
                // because they are wrong in Croppr
                let image = document.getElementsByClassName('croppr-image')[0];
                image.addEventListener("load", (event) => {
                    this.image = event.target;
                    this.factor_w = this.original_dimensions.width / event.target.clientWidth;
                    this.factor_h = this.original_dimensions.height / event.target.clientHeight;
                    this.setStartPosition();
                });
            }
        };

        if (this.min_width && this.min_height) {
            options.aspectRatio = this.min_height / this.min_width;
            options.minSize = [this.min_width, this.min_height, 'px'];
        }

        this.cropInstance = new Croppr(this.el, options);
    }

    getCropArea() {
        let coord = this.cropInstance.getValue();
        return {
            width:  Math.floor(coord.width * this.factor_w),
            height: Math.floor(coord.height * this.factor_h),
            left: Math.floor(coord.x * this.factor_w),
            top: Math.floor(coord.y * this.factor_h)
        };
    }

    setStartPosition () {
        let min_size = { // todo nur wenn set!
            width: this.min_width / this.factor_w,
            height: this.min_height / this.factor_h
        };
        this.cropInstance.options.minSize = min_size;

        let max_size = { // todo

        };

        if (!this.saved) {
            // set default values
            this.cropInstance.resizeTo(min_size.width, min_size.height);
            this.cropInstance.moveTo(0, 0);
        }
        else {
            // set to position of saved cropped image
            let calculated = {
                width:  Math.floor(this.saved.width / this.factor_w),
                height: Math.floor(this.saved.height / this.factor_h),
                left: Math.floor(this.saved.left / this.factor_w),
                top: Math.floor(this.saved.top / this.factor_h)
            };

            this.cropInstance.resizeTo(calculated.width, calculated.height);
            this.cropInstance.moveTo(calculated.left, calculated.top);

            //console.log(this.saved, calculated);
        }
    }
}