/**
 * Class representing a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
         * Speed of the movable object.
         * @type {number}
         */
    speed = 0.15;

    /**
     * Flag indicating the direction of the object.
     * @type {boolean}
     */
    otherDirection = false;

    /**
    * Vertical speed of the movable object.
    * @type {number}
    */
    speedY = 0;

    /**
 * Acceleration value for gravity.
 * @type {number}
 */
    acceleration = 2.5;

    /**
     * Energy level of the movable object.
     * @type {number}
     */
    energy = 100;

    /**
    * Number of coins collected by the movable object.
    * @type {number}
    */
    coinCollected = 0;

    /**
     * Number of bottles collected by the movable object.
     * @type {number}
     */
    bottleCollected = 0;

    /**
     * Timestamp of the last hit on the movable object.
     * @type {number}
     */
    lastHit = 0;

    /**
    * Timestamp of the last movement of the movable object.
    * @type {number}
    */
    lastMove = 0;

    /**
    * Object representing the offset for collision detection.
    * @type {{ top: number, left: number, right: number, bottom: number }}
    */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    /**
     * Apply gravity to the movable object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (!this.isAboveGround()) {
                this.y = 170;
                this.speedY = 0;
            }
        }, 50);
    }

    /**
 * Check if the object is above the ground.
 * @returns {boolean} - True if the object is above the ground, false otherwise.
 */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 170
        }
    }

    /**
 * Check if the object is colliding with another movable object.
 * @param {MovableObject} mo - The other movable object to check for collision.
 * @returns {boolean} - True if the objects are colliding, false otherwise.
 */

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height + this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.top
    }

    /**
 * Decreases the energy of the object by 5 and updates the last hit timestamp.
 */
    hit() {
        this.energy -= 5;
        if (this.energy < 19) {
            this.energy = 0;

        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    endBosshit() {
        this.energy -= 10;
        if (this.energy < 19) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Increases the collected coins by 5, capping at a maximum of 100.
     */
    collectCoins() {
        this.coinCollected += 5;
        if (this.coinCollected > 100) {
            this.coinCollected = 100;
        }
    }

    /**
 * Increases the collected bottles by 10, capping at a maximum of 100.
 */
    collectBottles() {
        this.bottleCollected += 10;
        if (this.bottleCollected > 100) {
            this.bottleCollected = 100;
        }
    }

    /**
 * Checks if the object is hurt based on the time since the last hit.
 * @returns {boolean} - True if the object is hurt, false otherwise.
 */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5
    }

    /**
 * Checks if the object is dead based on its energy level.
 * @returns {boolean} - True if the object is dead, false otherwise.
 */
    isDead() {
        return this.energy == 0;
    }

    /**
 * Plays an animation using the provided array of image paths.
 * @param {string[]} images - Array of image paths for the animation.
 * @returns {boolean} - True if there are more frames to play, false otherwise.
 */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= images.length) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
 * Moves the object to the right based on its speed.
 */
    moveRight() {
        this.x += this.speed;
    }

    /**
 * Moves the object to the left based on its speed.
 */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
 * Causes the object to jump by setting its vertical speed to 30.
 */
    jump() {
        this.speedY = 30;
    }
}