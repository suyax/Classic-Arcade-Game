// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;//setting the init location
    this.speed = speed;//setting the enemey speed

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    //updstes the new location
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player= function() {
    this.x = 202;
    this.y = 303;//initi location of player
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
Player.prototype.update = function() {
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (this.x >= 101 && this.x <= 404 && this.y >= 101 && this.y <= 505) {
        var speed = 100;
        if (key ==='left') {
            this.x += speed;
        } else if (key ==='up') {
            this.y += speed;
        } else if (key ==='right') {
            this.x -= speed;
        } else if (key ==='down') {
            this.y -= speed;
        }
    };
};
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player
var enemy1 = new Enemy(0,36,100);
var enemy2 = new Enemy(0,136,100);
var enemy3 = new Enemy(0,236,100);

var allEnemies= [enemy1,enemy2,enemy3];
var player= Object.create(Player);





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
