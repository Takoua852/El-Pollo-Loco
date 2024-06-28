/**
 * Class representing the game world.
 */
class World {
    /**
    * The main character of the game.
    * @type {Character}
    */
    character = new Character();

    /**
    * The end boss of the game.
    * @type {Endboss}
    */
    endBoss = new Endboss();

    /**
     * The current level of the game.
     * @type {Level}
     */
    level = level1;

    /**
    * The canvas element for rendering.
    * @type {HTMLCanvasElement}
    */
    canvas;

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input for the game.
     * @type {Keyboard}
     */
    keyboard;

    /**
   * The x-coordinate of the camera.
   * @type {number}
   */
    camera_x = 0;

    /**
    * The health status bar of the main character.
    * @type {HealthStatusBar}
    */
    healthBar = new HealthStatusBar();

    /**
    * The coin status bar for collecting coins.
    * @type {CoinStatusBar}
    */
    coinbBar = new CoinStatusBar();

    /**
     * The bottle status bar for collecting bottles.
     * @type {BottleStatusBar}
     */
    bottleBar = new BottleStatusBar();

    /**
   * The end boss status bar.
   * @type {EndBossStatusBar}
   */
    endbossBar = new EndBossStatusBar();

    /**
    * An array of throwable objects in the world.
    * @type {ThrowableObject[]}
    */
    throwableObjects = [];

    /**
   * The sound for collecting coins.
   * @type {Audio}
   */
    coins_sound = new Audio('audio/coin.mp3');

    /**
     * The sound for collecting bottles.
     * @type {Audio}
     */
    bottle_sound = new Audio('audio/bottle.mp3');

    /**
    * The sound for character hurt.
    * @type {Audio}
    */
    HURT_SOUND = new Audio('audio/hurt.mp3');

    /**
     * The sound for throwing objects.
     * @type {Audio}
     */
    THROW_SOUND = new Audio('audio/throw.mp3');

    /**
     * The sound for enemy (chicken) death.
     * @type {Audio}
     */
    ENEMY_DEAD_SOUND = new Audio('audio/chikenDead.mp3')

    /**
     * The icon representing the end boss.
     * @type {IconBoss}
     */
    iconBoss = new IconBoss();

    animationId;

    /**
    * Creates an instance of World.
    * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
    * @param {Keyboard} keyboard - The keyboard input for the game.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        cancelAnimationFrame(this.animationId);
        this.draw();
        this.setWorld();
        this.run();

    }

    /**
    * Sets the world properties for character and end boss.
    */
    setWorld() {
        this.character.world = this;
        this.endBoss.world = this;
    }

    /**
 * Runs the game loop, checking collisions and updating the game state.
 */
    run() {
        setInterval(() => {
            this.checkEnemmiesCollisions();
            this.checkBottlesCollisions();
            this.checkEndbossCollision();
            this.checkBottleEnemyCollisions();
            this.checkCoinsCollisions();
        }, 100);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    /**
 * Checks for collisions with throwable objects and updates the game state.
 */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottleCollected -= 10;
            if (this.character.bottleCollected < 19) {
                this.character.bottleCollected = 0;
            }
            this.bottleBar.setPercentage(this.character.bottleCollected);
            this.checkSound(this.THROW_SOUND);
        }
    }

    /**
 * Checks for collisions between throwable objects (bottles) and enemies in the game level.
 * Performs actions based on the type of collision, such as damaging the end boss or killing regular enemies.
 * Removes the thrown objects from the game after a delay.
 */
    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    if (this.endBoss.isColliding(bottle)) {
                        this.endBoss.endBosshit();
                        bottle.isBroken = true;
                        this.endbossBar.setPercentage(this.endBoss.energy);
                        setTimeout(() => {
                            this.throwableObjects.splice(index, 1);
                        }, 120);
                    }
                    else {
                        bottle.isBroken = true;
                        enemy.isKilled = true;
                        setTimeout(() => {
                            this.throwableObjects.splice(index, 1);
                        }, 200);
                    }
                }
            })

        });
    }

    /**
 * Checks for collisions between the character and enemies, updating the game state.
 */
    checkEnemmiesCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isKilled && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt() && this.character.speedY < 0) {
                    // this.character.jump();
                    enemy.isKilled = true;
                } else {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                    this.checkSound(this.HURT_SOUND);
                }
            }
        })
    }

    /**
 * Checks for collisions between the character and the end boss, updating the game state.
 */
    checkEndbossCollision() {
        if (this.character.isColliding(this.endBoss)) {
            this.character.energy -= 10;
            if (this.character.energy < 19) {
                this.character.energy = 0;
    
            }
            if (this.character.x > 200) {
                this.character.x -= 200;
            }
            this.character.speedY = 10;
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
 * Checks for collisions between the character and coins, updating the game state.
 */
    checkCoinsCollisions() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.coinbBar.setPercentage(this.character.coinCollected);
                this.checkSound(this.coins_sound);
            }
        });
        this.removeCollectedCoins();
    }

    /**
 * Removes collected coins from the level.
 */
    removeCollectedCoins() {
        this.level.coins = this.level.coins.filter((coin) => !this.character.isColliding(coin));
    }

    /**
 * Checks for collisions between the character and bottles, updating the game state.
 */
    checkBottlesCollisions() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.bottleBar.setPercentage(this.character.bottleCollected);
                this.checkSound(this.bottle_sound);
            }
        });
        this.removeCollectedBottles();
    }

    /**
 * Removes collected bottles from the level.
 */
    removeCollectedBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => !this.character.isColliding(bottle));
    }

    /**
 * Clears the canvas, translates the camera, draws game objects, and handles animation.
 */
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawAnimatedObjects();
        this.addToMap(this.character);
        this.drawSatusBar();
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        this.animationId = requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawAnimatedObjects() {
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.throwableObjects);
    }
    /**
 * Draws the status bar elements on the canvas.
 */
    drawSatusBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinbBar);
        this.addToMap(this.bottleBar);
        if (this.endBoss.firstContact) {
            this.addToMap(this.endbossBar);
            this.addToMap(this.iconBoss);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    /**
 * Adds multiple objects to the map.
 * @param {DrawableObject[]} objects - An array of drawable objects.
 */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
 * Adds a drawable object to the canvas.
 * @param {DrawableObject} mo - The drawable object to add.
 */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx)
        // mo.drawSecondFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
 * Flips the image horizontally for objects facing the other direction.
 * @param {DrawableObject} mo - The drawable object to flip.
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the original orientation of the image after flipping.
     * @param {DrawableObject} mo - The drawable object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
 * Checks if the game sound should be played based on the mute status.
 * @param {Audio} sound - The sound to play.
 */
    checkSound(sound) {
        if (!isMuted) {
            sound.play();
        }
    }

}