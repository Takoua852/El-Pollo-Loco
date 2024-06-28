/**
 * Class representing a status bar for the End Boss.
 * @extends StatusBar
 */
class EndBossStatusBar extends StatusBar {
      /**
     * Array of image paths for different percentage levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Initial percentage for the End Boss status bar.
     * @type {number}
     */
    percentage = 100;

     /**
     * Creates an instance of EndBossStatusBar.
     */
    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.IMAGES);
        this.x = 490;
        this.y = 0;
    }
}

/**
 * Class representing an icon for the End Boss.
 * @extends DrawableObject
 */
class IconBoss extends DrawableObject {
    /**
     * Path to the image for the End Boss icon.
     * @type {string}
     */
    img = 'img/7_statusbars/3_icons/icon_health_endboss.png';

    /**
     * y-coordinate of the End Boss icon.
     * @type {number}
     */
    y = 6;

     /**
     * x-coordinate of the End Boss icon.
     * @type {number}
     */
    x = 480;

    /**
     * Width of the End Boss icon.
     * @type {number}
     */
    width = 60;

     /**
     * Height of the End Boss icon.
     * @type {number}
     */
    height = 70;

    
    /**
     * Creates an instance of IconBoss.
     */
    constructor() {
        super();
        this.loadImage(this.img);
    }
}