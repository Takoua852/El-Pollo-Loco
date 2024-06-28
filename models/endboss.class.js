/**
 * Class representing the End Boss in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /**
     * Height of the End Boss.
     * @type {number}
     */
    height = 400;

    /**
     * Width of the End Boss.
     * @type {number}
     */
    width = 250;

    /**
     * y-coordinate of the End Boss.
     * @type {number}
     */
    y = 55;

    /**
   * Reference to the game world.
   * @type {World}
   */
    world;

    /**
   * Speed of the End Boss.
   * @type {number}
   */
    speed = 40;

    /**
    * Flag indicating the first contact with the End Boss.
    * @type {boolean}
    */
    firstContact = false;

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
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Audio for the End Boss hurt sound.
     * @type {Audio}
     */
    BOSS_HURT_SOUND = new Audio('audio/bossHurt.mp3');

    /**
     * Audio for the End Boss dead sound.
     * @type {Audio}
     */
    BOSS_DEAD_SOUND = new Audio('audio/endbossDead.mp3');



    /**
    * Creates an instance of Endboss.
    */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3900;
        this.animate();
        this.type = 'endboss';
    }

    /**
     * Animate the End Boss based on the game state.
     */
    animate() {
        setInterval(() => {
            if (world.character.x < 3500 && !this.firstContact) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            else {
                this.endBossPlayAnimation();
                this.firstContact = true;
            }
        }, 500);
    }

    /**
     * Check if the End Boss is in an attack state.
     * @returns {boolean} - True if the boss is in attack range.
     */
    bossAttack() {
        return this.x - world.character.x < 250
    }


    /**
     * Play the appropriate animation for the End Boss based on the game state.
     */
    endBossPlayAnimation() {
        if (world.endBoss.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.checkDeadSound();
            this.y += 50;
            document.getElementById('outro-screen').style.display = 'block';
            document.getElementById('canvas').style.position = 'absolute';
            cancelAnimationFrame(world.animationId);
            setTimeout(() => {
                for (let i = 1; i < 9999; i++) window.clearInterval(i);
            }, 1000);

        }
        else if (world.endBoss.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.playSound(this.BOSS_HURT_SOUND);
        }
        else if (this.bossAttack() && world.endBoss.x > world.character.x) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.bossMoveLeft();
        }
        else if (this.bossAttack() && world.endBoss.x < world.character.x) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.bossMoveRight();
        }
        else if (world.endBoss.x < world.character.x) {
            this.bossMoveRight();
            this.playAnimation(this.IMAGES_WALKING);
        }
        else {
            this.bossMoveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
         * Move the End Boss to the right.
         */
    bossMoveRight() {
        this.otherDirection = true;
        this.moveRight();
    }

     /**
     * Move the End Boss to the left.
     */
    bossMoveLeft() {
        this.otherDirection = false;
        this.moveLeft();
    }

    /**
     * Check and adjust the volume of the dead sound.
     */
    checkDeadSound() {
        this.playSound(this.BOSS_DEAD_SOUND);
        if (this.BOSS_DEAD_SOUND.volume >= 0.1) {
            this.BOSS_DEAD_SOUND.volume -= 0.1;
        } else {
            this.BOSS_DEAD_SOUND.volume = 0;
        }
    }

    /**
     * Play a sound if the game is not muted.
     * @param {Audio} sound - The sound to be played.
     */
    playSound(sound) {
        if (!isMuted) {
            sound.play();
            sound.volume = 0.5
        }
    }
}
