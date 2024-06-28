/**
 * Class representing a status bar in the game.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
/**
     * Array of image paths representing different percentage levels.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Current percentage value of the status bar.
     * @type {number}
     */
    percentage = 100;
   
     /**
     * Creates an instance of StatusBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage value.
     * @returns {number} - The index representing the appropriate image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 79) {
            return 4;
        }
        else if (this.percentage > 59) {
            return 3;
        }
        else if (this.percentage > 39) {
            return 2;
        }
        else if (this.percentage > 19) {
            return 1;
        }
        else {
            return 0;
        }
    }
}