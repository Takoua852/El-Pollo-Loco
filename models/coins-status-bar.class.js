/**
 * Class representing a status bar for displaying coin percentage.
 * @extends StatusBar
 */
class CoinStatusBar extends StatusBar {
    /**
         * Array of image paths for the coin status bar at different percentages.
         * @type {string[]}
         */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
         * Current percentage of the coin status bar.
         * @type {number}
         */
    percentage = 0;

    /**
     * Initial y-coordinate of the coin status bar.
     * @type {number}
     */
    y = 80;

    /**
    * Creates an instance of CoinStatusBar.
    * @constructor
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}
