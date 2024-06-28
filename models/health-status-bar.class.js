/**
 * Class representing the Health Status Bar in the game.
 * @extends StatusBar
 */
class HealthStatusBar extends StatusBar {
    /**
        * Array of image paths representing different health percentages.
        * @type {string[]}
        */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
   * y-coordinate of the Health Status Bar.
   * @type {number}
   */
    y = 40;

    /**
   * Initial health percentage.
   * @type {number}
   */
    percentage = 100;


    /**
     * Creates an instance of HealthStatusBar.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png')
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}