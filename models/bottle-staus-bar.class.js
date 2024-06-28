/**
 * Represents a status bar specifically for bottles in the game.
 * Extends the StatusBar class.
 * @class
 */
class BottleStatusBar extends StatusBar {
 /**
   * Array of image paths representing different percentage levels of the bottle status.
   * @type {string[]}
   */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    /**
   * Vertical position of the bottle status bar.
   * @type {number}
   */
    y = 0;

      /**
   * Percentage value representing the current status of the bottle.
   * @type {number}
   */
    percentage = 0;

    /**
 * Creates an instance of BottleStatusBar.
 * Loads the bottle status bar images and sets the initial percentage.
 * @constructor
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}