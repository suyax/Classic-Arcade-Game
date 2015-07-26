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
    var collision = function(player_x, enemy_x) {
        if (player_x <= enemy_x+40 && player_x >= enemy_x-35) {
            return true;
        };
    }
    if (collision(player.x, this.x)===true) {
        player.x =202;
        player.y =302;
    };
    var loop = function(enemy_x) {
        if (enemy_x >= 505) {
            return true
        };
    }
    if (loop(this.x) === true) {
        this.x = -101};
    this.x += this.speed*dt;
};
    //updstes the new location
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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
    if (this.y <= -20) {
        this.x = 202;
        this.y = 303;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var speed = 51;
    if (key ==='left' && this.x >= 20) {
        this.x -= speed;
    } else if (key ==='up' && this.y >= -20) {
        this.y -= speed;
    } else if (key ==='right' && this.x <= 380) {
        this.x += speed;
    } else if (key ==='down' && this.y <= 400) {
        this.y += speed;
    }
};
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player

var makeLane = function(numEnemy,enemy_y,speed) {
    var lane =[];
    var enemy_x = function() {
        var start_loc = Math.floor((Math.random() * 505))
        return start_loc};
    for (var i =1 ; i <= numEnemy; i++){
        var enemy= new Enemy(enemy_x(),enemy_y,speed);
        lane.push(enemy);
    }
    return lane
};
//lane 1 speed=100 numEnemy=2
//lane 2 speed=120 numEnemy=1
//lane 3 speed =80 numEnemy=3
var allEnemies = makeLane(2,36,100).concat(makeLane(1,136,120)).concat(makeLane(3,236,80))
var player = new Player;





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
