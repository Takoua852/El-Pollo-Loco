/**
 * Represents a character in the game.
 * Extends the MovableObject class.
 * @class
 */
class Character extends MovableObject {
    /**
      * Height of the character.
      * @type {number}
      */
    height = 250;


    /**
  * Initial y-coordinate of the character.
  * @type {number}
  */
    y = 170;

    /**
   * Speed of the character.
   * @type {number}
   */
    speed = 10;

    /**
 * Reference to the game world.
 * @type {World}
 */
    world;

    /**
   * Offset values for character boundaries.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
    offset = {
        top: 120, //120
        bottom: 30,
        left: 20,
        right: 20
    };

    /**
 * Array of idle images for the character.
 * @type {string[]}
 */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
       * Array of long idle images for the character.
       * @type {string[]}
       */
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
       * Array of walking images for the character.
       * @type {string[]}
       */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
       * Array of jumping images for the character.
       * @type {string[]}
       */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
   * Array of hurt images for the character.
   * @type {string[]}
   */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
 * Array of dead images for the character.
 * @type {string[]}
 */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
  * Walking sound effect for the character.
  * @type {Audio}
  */
    WALKING_SOUND = new Audio('audio/walk.mp3');

    /**
  * Jumping sound effect for the character.
  * @type {Audio}
  */
    JUMP_SOUND = new Audio('audio/jump.mp3');

    /**
   * Hurt sound effect for the character.
   * @type {Audio}
   */
    HURT_SOUND = new Audio('audio/hurt.mp3');

    /**
 * Death sound effect for the character.
 * @type {Audio}
 */
    DEATH_SOUND = new Audio('audio/dead.mp3');

    /**
 * Creates a new character instance.
 */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.lastMove = new Date().getTime();
        this.animate();
    }

    /**
      * Initiates the animation loop for the character.
      */
    animate() {
        setInterval(() => {
            this.WALKING_SOUND.pause();
            this.characterMoving();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.characterPlayAnimation();
    }

    /**
      * Handles character movement logic.
      */
    characterMoving() {
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterIsJumping();
    }

    /**
       * Moves the character to the right.
       */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playSound(this.WALKING_SOUND);
        }
    }

    /**
       * Moves the character to the left.
       */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playSound(this.WALKING_SOUND);
        }
    }

    /**
     * Handles character jumping logic.
     */
    characterIsJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && this.speedY < 170) {
            this.jump();
            this.lastMove = new Date().getTime();
            this.playSound(this.JUMP_SOUND);
        }
    }

    /**
 * Checks if the character is walking.
 * @returns {boolean} - True if walking, false otherwise.
 */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    /**
 * Checks if the character is resting.
 * @returns {boolean} - True if resting, false otherwise.
 */
    isResting() {
        let restingTime = new Date().getTime() - this.lastMove;
        restingTime = restingTime / 1000;
        return restingTime < 6 && restingTime > 1;
    }

    /**
 * Checks if the character is sleeping.
 * @returns {boolean} - True if sleeping, false otherwise.
 */
    isSleeping() {
        let sleepTime = new Date().getTime() - this.lastMove;
        sleepTime = sleepTime / 1000;
        return sleepTime >= 6;
    }

    /**
    * Initiates the character animation loop.
    * @function
    * @memberof Character
    * @returns {void}
    */
    characterPlayAnimation() {
        setInterval(() => {
            if (!this.isDead()) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.playSound(this.HURT_SOUND);
                    this.lastMove = new Date().getTime();
                }
                else if (this.isAboveGround() || this.world.keyboard.SPACE) {
                    this.playAnimation(this.IMAGES_JUMPING);
                }
                else if (this.isWalking() && !this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.lastMove = new Date().getTime();
                }
                else if (this.isResting() && !this.isWalking()) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
                else if (this.isSleeping() && !this.isWalking()) {
                    this.playAnimation(this.IMAGES_LONGIDLE);
                }
            }
            else if (this.isDead()) {
                this.playDeadAnimation();
            }
        }, 100);
    }

    /**
 * Plays the dead animation and performs related actions.
 * @function
 * @memberof Character
 * @returns {void}
 */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playSound(this.DEATH_SOUND);
        world.level.enemies = [];
        world.endBoss.speed = 0;
        document.getElementById('outro-screen').style.display = 'block';
        document.getElementById('canvas').style.position = 'absolute';
        document.getElementById("outro-btn").disabled = true;
        cancelAnimationFrame(world.animationId);
        setTimeout(() => {
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
            document.getElementById("outro-btn").disabled = false;
        }, 1000);

    }

    /**
 * Plays a sound if not muted.
 * @function
 * @memberof Character
 * @param {Audio} sound - The sound to be played.
 * @returns {void}
 */
    playSound(sound) {
        if (!isMuted) {
            sound.play();
        }
    }
}