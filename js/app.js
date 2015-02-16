// Create a variable that holds the DOM element for our scoreboard
var scoreboard = document.getElementById('scoreboard');
// This variable will hold the three starting positions that an enemy can start from. 
var bugStartPos = [60, 140, 226];
// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    // Here we use the Math.floor equation to generate random numbers.
    // Evey enemy that is created will start with a random speed
    //and one of the three starting positions in bugStartPos that we created earlier.
    this.y = bugStartPos[Math.floor(Math.random() * 3)];
    this.speed = Math.floor((Math.random() * 300) + 40);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Everytime the Enemy.update class is called, we set the enemy.x position to move
    // at the speed a specific enemy was created with.
    this.x += (this.speed * dt);
    // Here we are checkingto see if an enemy reached the end of the canvas.
    // If so, we set its starting postion back to the beginning. As well as generate a new random
    // strating position and a random speed.
    if (this.x > 550) {
        this.x = -50;
        this.y = bugStartPos[Math.floor(Math.random() * 3)];
        this.speed = Math.floor((Math.random() * 300) + 40);
    }
    // This calls the checkCollision function to see if an enemy has hit the player.
    enemy.checkCollision();

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Here I created the checkCollsion subclass that will check to see if an enemy has hit the player.
// To be perfectly honest, this gave me the most trouble in this project.
// I tried using the formula on the Udacity HTML5 game tutorial and could not get it to work.
// After hours of debugging, I came up with this formual below that works.
//However, I do beleive there should be an easier way to do this.
Enemy.prototype.checkCollision = function () {
    for (var enemy in allEnemies) {
        if ((allEnemies[enemy].x + 90 > player.x && allEnemies[enemy].x + 90 < player.x + 90 || allEnemies[enemy].x > player.x && allEnemies[enemy].x < player.x + 85) && (allEnemies[enemy].y + 85 > player.y && allEnemies[enemy].y + 85 < player.y + 85 )) {
            // If enemy collided with player, call the function to play the blast sound.
            sound.play('sound/blast.wav');
            // Subtract the player's lives by one.
            player.lives--;
            // reset the player to the original starting point.
            player.reset();
        }
    }

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// This  is the same idea as the enemy class. We set the starting position.
// Here we also need to set the starting score and the  amount of lives the player will start with. 
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 401;
    this.lives = 3;
    this.score = 0;
}
// This just simply returns the player to the original starting position.
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 401;
}
// Very similar to the Enemy update.
Player.prototype.update = function (dt) {
    this.x * dt;
    this.y * dt;
    // This statement checks to see if the player reached the water.
    // If so, we increase the score by 100, we play the score sound and reset player to starting position.
    if (this.y < -10) {
        this.score += 100;
        sound.play('sound/score.wav');
        player.reset();
    }
    // Here we are just checking to see if theplayer is out of lives. If player has zero lives,
    // Game is over and we need to reset everything.
    if (this.lives === 0) {
        this.score = 0;
        this.lives = 3;
        player.reset();
    }
    // This line just makes sure the scoreboard is getting updated.
    // We can call this because of the data we stored in scoreboard earlier.
    scoreboard.innerHTML = "Score: " + this.score + "   Lives: " + this.lives;
}
// This class just renders the player image on the screen.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Here we are handling input from the keyboard.
Player.prototype.handleInput = function (keyPress) {
    // Everytime the player makes a move, the jump sound should play.
    sound.play('sound/jump.wav');
    // Here we just have if statements to check if one of the four possible keyboard options have been pressed.
    // Not only do we ened to determine what key was pressed, we also need to set boundaries for the movement.
    // If the left key was pressed, we need to make sure the player is not already at the left edge of the canvas before we move.
    // The same idea is applied to the other three keyboard options.
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (keyPress === 'right' && this.x < 350) {
        this.x += 101;
    }
    if (keyPress === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress === 'down' && this.y < 401) {
        this.y += 83;
    }

}
// Here we create a sound class, that will set the src of the sound and play it when called.
// Sound on the web can be very intricate and the options are vast. I  am using the HTML5 'audio' element.
// Since this is a very simple game with only a few sounds needed I found this would be the simplest way to do this.
// Also by creating the class it enables me to easily add other sounds later on.
var Sound = function () {
    // We grab the element from the DOM and h old it in Sound.snd.
    this.snd = document.getElementById("soundEfx");
}
// Here we are just pasing in the sound file and then playing it.
// This enables us to easily call sounds from anywhere in the application. 
Sound.prototype.play = function (src) {
    this.snd.src = src;
    this.snd.play();
}
// Now instantiate your objects.
var sound = new Sound();
var enemy = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy, enemy2, enemy3];
// Place the player object in a variable called player

var player = new Player();





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
