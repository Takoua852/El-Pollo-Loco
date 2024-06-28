/**
 * Represents a movable background object in the game.
 * Extends the MovableObject class.
 * @class
 */
class BackgroundObject extends MovableObject {
    /**
      * Width of the background object.
      * @type {number}
      */
    width = 720;

    /**
   * Height of the background object.
   * @type {number}
   */
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @constructor
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        /**
     * The x-coordinate of the background object.
     * @type {number}
     */
        this.x = x;

        /**
    * The y-coordinate of the background object.
    * Calculated as the bottom of the screen minus the height of the object.
    * @type {number}
    */
        this.y = 480 - this.height;
    }
}