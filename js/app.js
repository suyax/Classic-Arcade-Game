/* app.js file provides majority of customize content that makes the actual game.
it provides logic for the game player, enemy and gem.  */
"use strict";
//set up canvas width and height
var CANVAS = {
    "width": 505,
    "height": 606
};
//set up menu render

function menuRender() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            ctx.fillStyle = 'rgba(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0,0.8)';
            ctx.fillRect(j * 101, i * 101, 101, 101);
        }
    }
    ctx.strokeRect(0, 0, CANVAS.width, CANVAS.height);
    ctx.font = "40px serif";
    ctx.textAlign = "left";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.fillStyle = "white";
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 0, 150);
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 0, 251);
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 101, 251);
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 0, 352);
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 101, 352);
    ctx.drawImage(Resources.get('images/enemy-bug.png'), 202, 352);
    ctx.fillText("Welcome to Frogger Game", 25, 50);
    ctx.font = "25px serif";
    ctx.fillText("Please Select Game Level", 25, 150);
    ctx.fillText("     Press E for Easy", 303, 260);
    ctx.fillText("Press N for Normal", 303, 361);
    ctx.fillText("    Press H for Hard", 303, 463);

}
//set up win render
function winRender() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    var img = Resources.get('images/Heart.png');
    var pat = ctx.createPattern(img, "repeat");
    ctx.rect(0, -101, CANVAS.width, CANVAS.height);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.drawImage(Resources.get(player.sprite), 202, 101);
    ctx.font = "40px serif";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.fillStyle = "purple";
    ctx.fillText("              YOU WIN!", 25, 350);
    ctx.fillText("    Press Space to Replay!", 25, 505);
    ctx.strokeRect(0, 0, CANVAS.width, CANVAS.height);

}
//set up lost render
function lostRender() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    var img = Resources.get('images/Rock.png');
    var pat = ctx.createPattern(img, "repeat");
    ctx.rect(0, -101, CANVAS.width, CANVAS.height);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.drawImage(Resources.get(player.sprite), 202, 101);
    ctx.font = "40px serif";
    ctx.textAlign = "left";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.fillStyle = "purple";
    ctx.fillText("            YOU LOST!", 25, 404);
    ctx.fillText("    Press Space to Replay!", 25, 555);
    ctx.strokeRect(0, 0, CANVAS.width, CANVAS.height);

}

//render other element on game screen
function renderOther() {
    ctx.font = "20px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("x " + player.life, 350, 101);
    ctx.fillText("Score: " + player.score, 414, 101);
    ctx.drawImage(Resources.get('images/Heart.png'), 320, 60, 30, 55);
    ctx.fillText("Press 1", 25, 575);
    ctx.fillText("Press 2", 126, 575);
    ctx.fillText("Press 3", 227, 575);
    ctx.fillText("Press 4", 328, 575);
    ctx.fillText("Press 5", 429, 575);
    ctx.drawImage(Resources.get('images/char-boy.png'), 0, 404);
    ctx.drawImage(Resources.get('images/char-cat-girl.png'), 101, 404);
    ctx.drawImage(Resources.get('images/char-horn-girl.png'), 202, 404);
    ctx.drawImage(Resources.get('images/char-pink-girl.png'), 303, 404);
    ctx.drawImage(Resources.get('images/char-princess-girl.png'), 404, 404);

}
//set up elements for main game loop
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y; //setting the init location
    this.speed = speed; //setting the enemey speed
    this.sprite = 'images/enemy-bug.png'; //helper for loading image

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (collision(player.x, player.y, this.x, this.y, 50)) {
        player.x = 202; //if collison happend player go back to inital location
        player.y = 303;
        player.life--; //player life reduce one

    }
    //check whether enemy reachs right edge of canvas
    function loop(enemy_x) {
        if (enemy_x >= CANVAS.width) {
            return true;
        }

    }
    //if loop is, then enemy reset to the left of canvas
    if (loop(this.x)) {
        this.x = -101;
    }
    this.x += this.speed * dt; //time delta apply to enemy movement.

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//set up Bonus
//set up array for all gems
var gems = ['images/Gem Orange.png', 'images/Gem Blue.png', 'images/Gem Green.png'],
    gemX = [101, 202, 303, 404],
    gemY = [101, 202, 303];


var Bonus = function() {
    this.x = gemX[Math.floor(Math.random() * gemX.length)];
    this.y = gemY[Math.floor(Math.random() * gemY.length)]; //gems will appear in randomlocation
    this.sprite = gems[Math.floor(Math.random() * gems.length)]; //gem will be randomcolor

};
// if player and gem collided, player socre up, gem reset
Bonus.prototype.update = function() {
    if (collision(player.x, player.y, this.x, this.y, 30)) {
        this.x = gemX[Math.floor(Math.random() * gemX.length)];
        this.y = gemY[Math.floor(Math.random() * gemY.length)];
        this.sprite = gems[Math.floor(Math.random() * gems.length)];
        player.score += 10;

    }
};
//draw gems
Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 85);

};

//  player class
var Player = function() {
    this.x = 202;
    this.y = 303; //set up initial location
    this.score = 0;
    this.life = 3; //set up initial score and life
    this.sprite = 'images/char-boy.png';

};
//put all charactor in array
var charactors = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
//when player at initial location, use key board to select charactors
Player.prototype.selectChar = function(key) {
    if (this.x === 202 && this.y === 303) {
        if (key === 'one') {
            this.sprite = charactors[0];
        } else if (key === 'two') {
            this.sprite = charactors[1];
        } else if (key === 'three') {
            this.sprite = charactors[2];
        } else if (key === 'four') {
            this.sprite = charactors[3];
        } else if (key === 'five') {
            this.sprite = charactors[4];

        }
    }
};

// when player cross to the top, score up, player back to initial location
Player.prototype.update = function() {
    if (this.y <= -20) {
        this.x = 202;
        this.y = 303;
        this.score += 10;

    }
};
//draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //draw selected player

};
// a handleInput() method.
Player.prototype.handleInput = function(key) {
    var speed = 101;
    if (key === 'left' && this.x >= 20) {
        this.x -= speed;
    } else if (key === 'up' && this.y >= -20) {
        this.y -= speed;
    } else if (key === 'right' && this.x <= 380) {
        this.x += speed;
    } else if (key === 'down' && this.y <= 404) {
        this.y += speed;

    }
};

// variable number of enemy and array allEnemies
var numEnemy,
    allEnemies,
// method selectLevel to fill allEnemis array based on num of enemy of each lane
Player.prototype.selectLevel = function(key) {
    var speedMin = 50,
        speedMax = 150,
        lanes = [36, 137, 238]; //set up min and max speed, set up lane y location for each lane
    if (key === 'easy') {
        numEnemy = 1;
    } else if (key === 'normal') {
        numEnemy = 2;
    } else if (key === 'hard') {
        numEnemy = 3;
    }
    //makelane function make enemies on one single lane
    function makeLane(numEnemy, enemy_y, speed) {
        var lane = [],
            enemiesIntial = [];

        function overlap(location, array) {
            var result = false;
            for (var element in array) {
                if ((location > array[element] - 101) && (location < array[element] + 101)) {
                    result = true;
                    break;
                }
            }
            return result;

        }
        function enemy_x() { //if the start location of one enemy overlap with other enemies, then regenarate enmey start location
            var start_loc = randomNum(-101, 404);
            while (overlap(start_loc, enemiesIntial)) {
                start_loc = randomNum(-101, 404);
            }
            enemiesIntial.push(start_loc);
            return start_loc;

        };

        for (var i = 0; i < numEnemy; i++) {
            var enemy = new Enemy(enemy_x(), enemy_y, speed);
            lane.push(enemy);
        }
        return lane;

        }

    if (!allEnemies) {
        allEnemies = makeLane(numEnemy, lanes[0], randomNum(speedMin, speedMax)).concat(makeLane(numEnemy, lanes[1], randomNum(speedMin, speedMax))).concat(makeLane(numEnemy, lanes[2], randomNum(speedMin, speedMax)));

    } //if allEnemies is not defined, put all enemy from each lane to allEnemies array.
}


//set up level and instance of enemy and player
var player = new Player();
var gem = new Bonus();

//helper functions
//collision function based on palyer and enemy postion and buffer size calculation whether collision happen
function collision(player_x, player_y, enemy_x, enemy_y, buffer) {
    if (enemy_x - buffer <= player_x && player_x <= enemy_x + buffer && enemy_y - buffer <= player_y && player_y <= enemy_y + buffer) {
        return true;

    }
}
//randomNum function to improve variety of game expeience
function randomNum(from, to) {
    function random() {
        return Math.floor(Math.random() * (to - from)) + from;
    }
    return random(from, to);

}
//detact whether player win the game
function playerWin(score) {
    if (score >= 100) {
        return true;

    }
}
//detact whether player lose the game
function playerLost(life) {
    if (life <= 0) {
        return true;

    }
}

// This listens for key presses and sends the keys
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
        53: 'five',
        69: 'easy',
        78: 'normal',
        72: 'hard'

    };
    player.selectLevel(allowedKeys[e.keyCode]);
    player.selectChar(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});