/**
 * Class representing a drawable object.
 */
class DrawableObject {
    /**
     * Image object associated with the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
    * Cache for storing image objects associated with different paths.
    * @type {Object}
    */
    imageCache = {};

    /**
     * Current image index.
     * @type {number}
     */
    currentImage = 0;

    /**
    * x-coordinate of the drawable object.
    * @type {number}
    */
    x = 120;

    /**
     * y-coordinate of the drawable object.
     * @type {number}
     */
    y = 280;

    /**
    * Height of the drawable object.
    * @type {number}
    */
    height = 150;

    /**
     * Width of the drawable object.
     * @type {number}
     */
    width = 100;


    /**
    * Loads an image from the given path and sets it as the current image.
    * @param {string} path - The path to the image.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawSecondFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            const X1 = this.x + this.offset.left
            const Y1 = this.y + this.offset.top
            const With1 = this.width - this.offset.right - this.offset.left
            const High1 = this.height - this.offset.top - this.offset.bottom
            ctx.rect(X1, Y1, With1, High1);
            ctx.stroke();
        }
    }

    /**
      * Loads multiple images into the image cache.
      * @param {string[]} arr - An array of image paths.
      */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}