/**
 * Main canvas element for the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main world instance of the game.
 * @type {World}
 */
let world;

/**
 * The keyboard handler instance for controlling the game.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * A flag indicating whether the sound is muted.
 * @type {boolean}
 */
let isMuted = false;

/**
 * A flag indicating whether the game has started.
 * @type {boolean}
 */
let gameStarted = false;

/**
 * A flag indicating whether the game is in fullscreen mode.
 * @type {boolean}
 */
let isFullscreen = false;

/**
 * Starts the game by setting up necessary elements and initializing the game world.
 * @function
 * @returns {void}
 */
function startGame() {
  document.getElementById('loading-screen').style.position = 'absolute';
  canvas = document.getElementById('canvas');
  canvas.style.display = 'block';
  // Initialize the game level.
  initLevel();
  world = new World(canvas, keyboard);
  gameStarted = true;
  disableStartButton();
}

/**
 * Disables the start button after the game has started.
 */
function disableStartButton() {
  if (gameStarted) {
    document.getElementById("start-btn").disabled = true;
  }
}

/**
 * Restarts the game by resetting elements and initializing a new game world.
 * @function
 * @returns {void}
 */
function restartGame() {
  document.getElementById('canvas').style.position = 'relative';
  document.getElementById('outro-screen').style.display = 'none';
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  gameStarted = false;
}

/**
 * Toggles the audio icon based on the mute state.
 * @function
 * @returns {void}
 */
function checkAudio() {
  let audioImage = document.getElementById('audio');
  if (isMuted) {
    audioImage.src = 'img/volume.png';
    isMuted = !isMuted;
  } else if (!isMuted) {
    audioImage.src = 'img/mute.png';
    isMuted = true;
  }
}

/**
 * Adjusts the display of an orientation prompt based on the window dimensions.
 * @function
 * @returns {void}
 */
function checkOrientation() {
  var orientationPrompt = document.getElementById('orientationPrompt');
  if (window.innerWidth > window.innerHeight) {
    orientationPrompt.style.display = 'none';
  } else {

    orientationPrompt.style.display = 'flex';
  }
}

/**
 * Event listener for changes in the orientation of the device.
 * It triggers the checkOrientation function after a slight delay.
 * @event orientationchange
 */
window.addEventListener('orientationchange', function () {
  setTimeout(checkOrientation, 100);
});

/**
 * It handles the click event on a button to toggle the display of a specific div.
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("controller");
  var myDiv = document.getElementById("control-menu");

  button.addEventListener("click", function () {
    if (myDiv.style.display === "flex") {
      myDiv.style.display = "none";
    } else {
      myDiv.style.display = "flex";
    }
  });
});

/**
 * Toggles between fullscreen and normal mode.
 */
function toggleFullscreen() {
  let element = document.getElementById("content");
  if (!isFullscreen) {
    enterFullscreen(element);
  }
  else {
    exitfullscreen();
  }
}

/**
 * Enters fullscreen mode for a specified HTML element.
 * @function
 * @param {HTMLElement} element - The HTML element to be displayed in fullscreen.
 * @returns {void}
 */
function enterFullscreen(element) {
  element = document.getElementById("content");
  // Check for the presence of browser-specific fullscreen request methods.
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
  isFullscreen = !isFullscreen;
}

/**
 * Exits fullscreen mode.
 * @function
 * @returns {void}
 */
function exitfullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  isFullscreen = false;
}

/**
 * Event handler for key presses.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode === 38) {
    keyboard.UP = true;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Event handler for releasing keys.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }
  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Event handler for touching screen elements.
 * @param {TouchEvent} e - The TouchEvent object.
 */
document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('btnLinks').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('btnLinks').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('btnRight').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('btnRight').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('btnUp').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('btnUp').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById('btnThrow').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById('btnThrow').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.D = false;
  });
});
