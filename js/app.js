// Enemies our player must avoid
var Enemy = function(x, y,speed) {
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
    this.x += this.speed*dt;//updstes the new location
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
    this.x =this.x;
    this.y =this.y;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {
    if (this.x>=101 && this.x <=404 && this.y>=101 &&this.y<=505) {
        if (e.keyCode===37) {
            this.x=this.x-101}
        else if (e.keyCode===38) {
            this.y=this.y-101}
        else if (e.keyCode===39) {
            this.x=this.x+101}
        else if (e.keyCode==40) {
            this.y=this.y+101
        }
    };
};
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player
var allEnemies= [new Enemy(0,36,100)];
    allEnemies.push(new Enemy(0,136,100));
    allEnemies.push(new Enemy(0,236,100));
var player= new Player();





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
