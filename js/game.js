// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var textScore;
var textLives;
var winningMessage;
var won = false;
var lost = false;
var currentScore = 0;
var winningScore = 100;
var currentLives = 3;
var gameOverLives = 0;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(225, 500, 'coin');
  createItem(100, 250, 'coin');
  createItem(575, 150, 'coin');
  createItem(525, 300, 'coin');
  createItem(650, 250, 'coin');
  createItem(225, 200, 'coin');
  createItem(375, 100, 'poison');
  createItem(370,500,'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(300, 450, 'platform');
  platforms.create(250, 150, 'platform');
  platforms.create(50, 300, 'platform');
  platforms.create(150, 250, 'platform');
  platforms.create(650, 300, 'platform');
  platforms.create(550, 200, 'platform2');
  platforms.create(300, 450, 'platform2');
  platforms.create(400, 350, 'platform2');
  platforms.create(100, 100, 'platform2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (lost === false && won === false) {
    if (item.key === 'coin') {
      currentScore = currentScore + 10;
    } else if (item.key === 'poison') {
      currentLives = currentLives - 1;
    } else if (item.key === 'star') {
      currentScore = currentScore + 25;
    }
  } 
  else if ((lost || won) === true); {
  }
  
  if ((lost === false && won === false) && (currentScore >= winningScore)) {
      createBadge();
  }
  
  if (currentLives === gameOverLives) {
    lost = true;
    win = false;
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}






// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'images/platform_1.png');
    game.load.image('platform2', 'images/platform_2.png');
    
    //Load spritesheets
//    game.load.spritesheet('player', 'images/chalkers.png', 48, 62);
    game.load.spritesheet('player', 'images/mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'images/coin.png', 36, 44);
    game.load.spritesheet('badge', 'images/badge.png', 42, 54);
    game.load.spritesheet('poison', 'images/poison.png', 32, 32);
    game.load.spritesheet('star', 'images/star.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    textScore = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    textLives = game.add.text(680, 16, "LIVES: " + currentLives, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    gameOverMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    
    
    winningMessage.anchor.setTo(0.5, 1);
    gameOverMessage .anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    textScore.text = "SCORE: " + currentScore;
    textLives.text = "LIVES: " + currentLives;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winws the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }

  
    // when the player loses the game
    if (lost) {
      gameOverMessage.text = "OUT OF LIVES. GAME OVER!!!";
    }
  }

  function render() {

  }

};
