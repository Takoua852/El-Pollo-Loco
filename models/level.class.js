/**
 * Class representing a level in the game.
 */
class Level {
     /**
     * Array of enemy objects in the level.
     * @type {Array}
     */
    enemies;

     /**
     * Array of cloud objects in the level.
     * @type {Array}
     */
    clouds;

    /**
     * Array of coin objects in the level.
     * @type {Array}
     */
    coins;

    /**
     * Array of bottle objects in the level.
     * @type {Array}
     */
    bottles;

     /**
     * Array of background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * x-coordinate marking the end of the level.
     * @type {number}
     */
    level_end_x = 3600;

      /**
     * Creates an instance of Level.
     * @param {Array} enemies - Array of enemy objects in the level.
     * @param {Array} clouds - Array of cloud objects in the level.
     * @param {Array} coins - Array of coin objects in the level.
     * @param {Array} bottles - Array of bottle objects in the level.
     * @param {Array} backgroundObjects - Array of background objects in the level.
     */
    constructor(enemies, clouds, coins, bottles,backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins  = coins;
        this.backgroundObjects = backgroundObjects;
    }
}