/**
 * Represents a salsa bottle as a movable object in the game.
 * Extends the MovableObject class.
 * @class
 */
class Bottles extends MovableObject {
  /**
   * Array of image paths representing different salsa bottle states.
   * @type {string[]}
   */
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

     /**
   * Height of the salsa bottle.
   * @type {number}
   */
    height = 70;

    /**
   * Width of the salsa bottle.
   * @type {number}
   */
    width = 60;

     /**
   * Vertical position of the salsa bottle.
   * @type {number}
   */
    y = 350;

    offset = {
      top: 10,
      left: 20,
      right: 20,
      bottom: 10
  }


     /**
   * Creates an instance of Bottles.
   * Loads the salsa bottle images and sets initial properties.
   * @constructor
   */
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);

         /**
     * Horizontal position of the salsa bottle.
     * Randomly assigned within a specified range.
     * @type {number}
     */
        this.x = 200 + Math.random() * 3200;

         /**
     * Randomly selects an image for the salsa bottle.
     * @type {string}
     */
        const randomImage = Math.floor(Math.random() * this.IMAGES.length);
        this.loadImage(this.IMAGES[randomImage]);
    }
}