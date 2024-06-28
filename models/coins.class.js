/**
 * Class representing a movable coin object.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /**
     * Array of image paths for the coin object.
     * @type {string[]}
     */
    IMAGES = [
        'img/8_coin/coin_1.png'
    ];

    /**
     * x-coordinate of the coin object.
     * @type {number}
     */
    x = 50;

    /**
    * y-coordinate of the coin object.
    * @type {number}
    */
    y = 50;

    /**
   * Height of the coin object.
   * @type {number}
   */
    height = 100;

    /**
     * Width of the coin object.
     * @type {number}
     */
    width = 100;

    offset = {
        top:40,
        left: 40,
        right: 40,
        bottom: 40
    }

    /**
    * Creates an instance of Coin.
    * @constructor
    */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 250 + Math.random() * 3000;
        this.y = 50 + Math.random() * 200;
    }
}