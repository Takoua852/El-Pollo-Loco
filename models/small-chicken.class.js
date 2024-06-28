/**
 * Class representing a small chicken in the game.
 * @extends Chicken
 */
class SmallChicken extends Chicken {
    /**
         * Height of the small chicken.
         * @type {number}
         */
    height = 55;

    /**
    * Width of the small chicken.
    * @type {number}
    */
    width = 80;

    /**
     * y-coordinate of the small chicken.
     * @type {number}
     */
    y = 360;

    /**
  * Flag indicating if the small chicken is killed.
  * @type {boolean}
  */
    isKilled = false;

    /**
     * Object representing the offset for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Creates an instance of SmallChicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.type = 'smallchicken';
        this.animate;
    }

    /**
 * Initiates animations for the small chicken.
 */
    animate() {
        setInterval(() => this.smallChickenWalk(), 1000 / 60);
        setInterval(() => this.smallChickenPlayAnimation(), 200);
        setInterval(() => this.SmallChickenDead(), 20);
    }

    /**
 * Handles the walking animation for the small chicken.
 */
    smallChickenWalk() {
        this.moveLeft();
        if (!this.isKilled) {
            this.moveLeft();
        }
    }

    /**
 * Plays the walking animation for the small chicken if not killed.
 */
    smallChickenPlayAnimation() {
        if (!this.isKilled) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
 * Handles the dead animation for the small chicken if killed.
 */
    SmallChickenDead() {
        if (this.isKilled) {
            this.playAnimation(this.IMAGES_DEAD);
            this.y++;
            this.speed = 0;
        }
    }
}