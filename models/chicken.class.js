/**
 * Class representing a Chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
        * Height of the chicken.
        * @type {number}
        */
    height = 55;

    /**
    * Width of the chicken.
    * @type {number}
    */
    width = 100;

    /**
     * Initial y-coordinate of the chicken.
     * @type {number}
     */
    y = 360;

    /**
     * Indicates if the chicken is killed.
     * @type {boolean}
     */
    isKilled = false;

    /**
   * Offset values for collision detection.
   * @type {Object}
   * @property {number} top - Top offset.
   * @property {number} left - Left offset.
   * @property {number} right - Right offset.
   * @property {number} bottom - Bottom offset.
   */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }

    /**
     * Array of walking images for the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

     /**
     * Array of dead images for the chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

     /**
     * Creates an instance of Chicken.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.energy = 5;
        this.animate();
        this.type = 'chicken';
    }

     /**
     * Initiates chicken animations.
     * @function
     * @private
     * @returns {void}
     */
    animate() {
        setInterval(() => this.chickenWalk(), 1000 / 60);
        setInterval(() => this.chickenPlayAnimation(), 200);
        setInterval(() => this.chickenDead(), 20);
    }

     /**
     * Moves the chicken to the left.
     * @function
     * @private
     * @returns {void}
     */
    chickenWalk() {
        this.moveLeft();
        if (!this.isKilled) {
            this.moveLeft();
        }
    }

      /**
     * Plays the walking animation for the chicken.
     * @function
     * @private
     * @returns {void}
     */
    chickenPlayAnimation() {
        if (!this.isKilled) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

     /**
     * Plays the dead animation for the chicken.
     * @function
     * @private
     * @returns {void}
     */
    chickenDead() {
        if (this.isKilled) {
            this.playAnimation(this.IMAGES_DEAD);
            this.y++;
            this.speed = 0;
        }
    }
}