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
	//collision function based on palyer and enemy image size calculate the collision position, reuduce collision range
	//on Y coordinance to make the game easier
    var collision = function(player_x, player_y, enemy_x, enemy_y) {
        if ( enemy_x <= player_x && player_x <= enemy_x+50 && enemy_y-50 <= player_y && player_y <= enemy_y+50) {
            return true;
        };
    }
    if (collision(player.x, player.y, this.x, this.y )===true) {
        player.x =202;
        player.y =302;
        player.score--;
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
    this.y = 303;
    this.score =1;

    //initi location of player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.selectChar =function(key) {
    if (key === 'one') {
        this.sprite = 'images/char-boy.png';
    } else if (key === 'two') {
        this.sprite = 'images/char-cat-girl.png';
    } else if (key === 'three') {
        this.sprite = 'images/char-horn-girl.png';
    } else if (key === 'four') {
        this.sprite = 'images/char-pink-girl.png';
    } else if (key === 'five') {
        this.sprite = 'images/char-princess-girl.png';
    }
};

// This class requires an update(), render() and
Player.prototype.update = function() {
    if (this.y <= -20) {
        this.x = 202;
        this.y = 303;
        this.score += 100;
    }
};

Player.prototype.render = function() {
    ctx.font = "20px serif";
    ctx.fillText("Press 1", 25, 575);
    ctx.fillText("Press 2", 126, 575);
    ctx.fillText("Press 3", 227, 575);
    ctx.fillText("Press 4", 328, 575);
    ctx.fillText("Press 5", 429, 575);
    ctx.fillText("Score: "+ this.score,414,101);
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    ctx.drawImage(Resources.get('images/char-boy.png'), 0,404)
    ctx.drawImage(Resources.get('images/char-cat-girl.png'), 101,404)
    ctx.drawImage(Resources.get('images/char-horn-girl.png'), 202,404)
    ctx.drawImage(Resources.get('images/char-pink-girl.png'), 303,404)
    ctx.drawImage(Resources.get('images/char-princess-girl.png'), 404,404)
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
    var lane =[], enemiesIntial=[];
    var enemy_x = function() {
        var start_loc = randomNum(100,405,random);
        while(overlay(start_loc, enemiesIntial)){
        	start_loc = randomNum(100,405,random);
        }
		enemiesIntial.push(start_loc)
		return start_loc;
    }

    for (var i=0; i < numEnemy; i++){
        var enemy= new Enemy(enemy_x(),enemy_y,speed);
        lane.push(enemy)
    }
    return lane;
};
//lane 1 enemy_y location 36
//lane 2 enemy_y location 136
//lane 3 enemy_y location 236

var allEnemies = makeLane(randomNum(1,3,random),36,randomNum(80,120,random)).concat(makeLane(randomNum(1,3,random),136,randomNum(80,120,random))).concat(makeLane(randomNum(1,3,random),236,randomNum(80,120,random)));
var player = new Player;
console.log(player);

//helper functions
function overlay(location, array){
	result=false;
	for(var element in array){
		if((location > array[element]-100) && (location < array[element]+100)){
			result= true;
			break;
		}
	}
	return result;
}

function random(from, to){
	return Math.floor(Math.random()*to)+from;
}

function randomNum(from, to, random) {
	return random(from, to);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'one',
        50: 'two',
        51: 'three',
        52: 'four',
        53: 'five'
    };
    player.selectChar(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);

});
//put gems
