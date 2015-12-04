"use strict";

// set boundary constants
const MIN_X = 0;
const MIN_Y = 0;
const MAX_X = 400;
const MAX_Y = 375;

function log(param) { console.log(param); }
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// Enemies our player must avoid
var Enemy = function(x, y, speed, enemyNumber) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.enemyNumber = enemyNumber;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 499) {
        this.x = -100; // reset enemy position when it reaches far right of screen
    } else {
        this.x += this.speed * dt; // advance enemy along the screen
        this.speed = getRandomInt(10, 1000); // make enemies move at random speed
    }

    //document.getElementById('enemy' + this.enemyNumber).innerHTML = "x = " + Math.round(this.x) + " || speed = " + this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //log(this);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

// link Player proto to Enemy proto in order to inherit render method
Player.prototype = Object.create(Enemy.prototype);
// add constructor property back into Player
Player.prototype.constructor = Player;

//Player.prototype.reportPos = function(player) {
//    //console.log("x = " + player.x + " : y = " + player.y);
//    document.getElementById('player').innerHTML = ("x = " + player.x + " : y = " + player.y);
//};

// move player based on keydown
Player.prototype.update = function(key) {
    if (key == 'up') {
        if (player.y == 55) {
            player.y = 0;
            document.getElementById('message').innerHTML = "Y O U&nbsp;&nbsp;W I N !";
            document.getElementById('message').style.color = "#070";
            setTimeout(function(){ gameOver = true; }, 200); // wait a short time before ending game
        } else if (player.y > MIN_Y) {
            player.y -= 80;
        }
        //player.reportPos(this);
    }
    if (key == 'down') {
        if (player.y < MAX_Y) player.y += 80;
        //player.reportPos(this);
    }
    if (key == 'left') {
        if (player.x > MIN_X) player.x -= 100;
        //player.reportPos(this);
    }
    if (key == 'right') {
        if (player.x < MAX_X) player.x += 100;
        //player.reportPos(this);
    }
};

// handle keyboard input and pass it to the update function
Player.prototype.handleInput = function(key) {
    if (!gameOver) player.update(key); // don't accept keyboard input if game is over
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy(getRandomInt(0, 400), 55, 40, 1));
allEnemies.push(new Enemy(getRandomInt(0, 400), 135, 20, 2));
allEnemies.push(new Enemy(getRandomInt(0, 400), 135, 4));
allEnemies.push(new Enemy(getRandomInt(0, 400), 215, 60, 3));

var player = new Player(200, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});