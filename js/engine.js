/* engine.js file serves as the base file that provide shell structure of the game.
it includes global variables that can be used by app.js, game state mechanism and resources to get the game going.
Functions in engine.js should able to refactor and reused in the future for similar games. */

"use strict";
//This engine is available globally and it also makes the canvas' context (ctx) object globally available
var Engine = (function(global) {
    /* Predefine the variables be usd within this scope,
        create the canvas element, grab the 2D context for that canvas
        set the canvas elements height/width and add it to the DOM. */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);
    //this function setup the initial state of the game to menu
    var State = function() {
        this.current = 'menu';
    };
    // this function calls different function according to current game state
    State.prototype.update = function() {
        if (this.current === 'menu') {
            menu();
        } else if (this.current === 'play') {
            main();
        } else if (this.current === 'gameWin') {
            gameWin();
        } else if (this.current === 'gameLost') {
            gameLost();

        }
    };
    // this function handle input for game state switch
    State.prototype.handleInput = function(key) {
        if ((key === 'easy' || key === 'normal' || key === 'hard') && this.current === 'menu') {
            this.current = 'play';
        } else if (key === 'space' && (this.current === 'gameWin' || this.current === 'gameLost')) {
            this.current = 'menu';
            reset();

        }
    };
    //instance the state for current game
    var state = new State();
    //pass key to state handleinput function
    document.addEventListener('keydown', function(e) {
        var allowedKeys = {
            32: 'space',
            69: 'easy',
            78: 'normal',
            72: 'hard'

        };
        state.handleInput(allowedKeys[e.keyCode]);
    });

    /*this function serves as the start screen for game
    if current state is menu it will setup time dt and render menu
    if current state swithed to play , it will call state.update */
    function menu() {
        if (state.current === 'play') {
            return state.update();
        }
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        menuRender();
        lastTime = now;
        win.requestAnimationFrame(menu);

    }

    /*This function serves as the end point for the player losing the game
      and handles properly calling the update and render methods.*/
    function gameWin() {
        if (state.current === 'menu') {
            return state.update();
        }
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        winRender();
        lastTime = now;
        win.requestAnimationFrame(gameWin);

    }

    /*This function serves as the end point for the player winning the game
      and handles properly calling the update and render methods.*/
    function gameLost() {
        if (state.current === 'menu') {
            return state.update();
        }
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        lostRender();
        lastTime = now;
        win.requestAnimationFrame(gameLost);

    }

    /*This function serves as the kickoff point for the game loop itself
      and handles properly calling the update and render methods.*/
    function main() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (playerWin(player.score) && state.current === 'play') {
            state.current = 'gameWin';
            return state.update();

        }
        if (playerLost(player.life) && state.current === 'play') {
            state.current = 'gameLost';
            return state.update();

        }
        /* Get our time delta information which is required if your game
        requires smooth animation.*/
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /* Call our update/render functions, pass along the time delta to
         update function since it may be used for smooth animation.*/
        update(dt);
        render();
        /* Set our lastTime variable which is used to determine the time delta
        for the next time this function is called.*/
        lastTime = now;
        /* Use the browser's requestAnimationFrame function to call this
        function again as soon as the browser is able to draw another frame.*/
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once per game,
    particularly setting the lastTime variable that is required for the game loop. */
    function init() {
        reset();
        lastTime = Date.now();
        menu();

    }
    /* This function is called by main and itself calls all
    of the functions which may need to update entity's data. */
    function update(dt) {
        updateEntities(dt);

    }
    /* This is called by the update function  and loops through all of the
     objects within allEnemies array as defined in app.js and calls
     their update() methods. It will then call the update function for your
     player object. */
    function updateEntities(dt) {
        if (allEnemies) {
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
        }
        player.update();
        gem.update();

    }
    /* This function initially draws the "game", it will then call
    the renderEntities function. This function is called every
    game tick */
    function render() {
        /* This array holds the relative URL to the image used
        for that particular row of the game level.*/
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass

            ],
            numRows = 6,
            numCols = 5,
            row, col;
        /* Loop through the number of rows and columns we've defined above
        and, using the rowImages array, draw the correct image for that
        portion of the "grid"*/
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();

    }
    /* This function is called by the render function and is called on each game tick. */
    function renderEntities() {
        gem.render();
        if (allEnemies) {
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
        }
        player.render();
        renderOther();

    }

    function reset() {
        allEnemies = null;
        player.sprite = 'images/char-boy.png';
        player.x = 202;
        player.y = 303;
        player.score = 0;
        player.life = 3;
    }
    /* load all of the images that need to draw . Then set init as the callback method,
    so that when all of these images are properly loaded game will start. */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Selector.png',
        'images/Gem Orange.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Star.png',
        'images/Heart.png',
        'images/Rock.png',
    ]);
    Resources.onReady(init);
    /* Assign the canvas' context object to the global variable */
    global.ctx = ctx;
})(this);