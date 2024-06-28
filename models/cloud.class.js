/**
 * Class representing a Cloud background object.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
  * Initial y-coordinate of the cloud.
  * @type {number}
  */
    y = 20;

    /**
   * Height of the cloud.
   * @type {number}
   */
    height = 250;

    /**
    * Width of the cloud.
    * @type {number}
    */
    width = 500;

    /**
     * Creates an instance of Cloud.
     * @constructor
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
    * Initiates cloud animation.
    * @function
    * @private
    * @returns {void}
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
    }
}