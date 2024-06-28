/**
 * Class representing a throwable object in the game.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
   /**
     * Flag indicating if the throwable object is broken.
     * @type {boolean}
     */
    isBroken = false;

    /**
     * Array of image paths for the throwable object rotation animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths for the salsa splash animation.
     * @type {string[]}
     */
    IMAGES_SALSA = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {boolean} otherdirection - Flag indicating the direction of the throwable object.
     */
    constructor(x, y, otherdirection) {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SALSA);
        this.x = x;
        this.y = y;
        this.otherDirection = otherdirection;
        this.height = 60;
        this.width = 50;
        this.throw();
    }
    
    /**
 * Initiates the throw action for the throwable object.
 */
    throw() {
        this.animate();
        this.applyGravity();
        this.speedY = 30;
        if (!this.otherDirection) {
            this.throwRight();
        }
        else {
            this.throwLeft();
        }
    }

    /**
 * Throws the object to the left with a specific interval.
 */
    throwLeft() {
        setInterval(() => {
            this.x -= 10;
        }, 60);
    }

    /**
 * Throws the object to the right with a specific interval.
 */
    throwRight() {
        setInterval(() => {
            this.x += 10;
        }, 60);
    }

    /**
 * Initiates animations for the throwable object.
 */
    animate() {
        setInterval(() => {
            if (!this.isBroken) {
                this.playAnimation(this.IMAGES);
            }
            else {
                this.playAnimation(this.IMAGES_SALSA);
                this.isBroken = true;
            }
        }, 1000 / 25);
    }
}