this.focus();
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index: -1");
  resetSnake();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSnakePosition();
}

function resetSnake() {
  resetSnakePosition();
  snakeSize = 3;
  points = 0;
  directionX = 1;
  directionY = 0;
}

function resetSnakePosition() {
  positionSnake(
    Math.floor(windowWidth / blockSize / 2),
    Math.floor(windowHeight / blockSize / 2)
  );
}

var blockSize = 40;
var size = 10;

var gameStarted = false;

var points = 0;
var snakeSize = 3;
var playerX = new Array(snakeSize);
var playerY = new Array(snakeSize);
for (i = 0; i < snakeSize; i++) {
  playerX[i] = -1;
  playerY[i] = -1;
}

var directionX = 0;
var directionIntentX = 0;
var directionY = 0;
var directionIntentY = 0;

var appleX = 10;
var appleY = 10;

function draw() {
  if (keyIsDown(CONTROL) && keyIsDown(SHIFT) && keyIsDown(ENTER)) {
    gameStarted = !gameStarted;
    if (!gameStarted) clear();
    resetSnake();
  }

  if (!gameStarted) return;

  canvas.style("z-index: 1000");
  clear();
  drawSnake();
  drawApple();
  drawPoints();
  updateSnake();
  collisionCheck();
  frameRate(5+points);
}

function drawPoints() {
  if (points === 0) return;
  var c = color(0, 255, 0);
  fill(c);
  textSize(32);
  text(points, 10, 30);
}

function drawSnake() {
  var c = color(0, 255, 0);
  fill(c);

  var i;
  for (i = 0; i < snakeSize; i++) {
    rect(playerX[i] * blockSize, playerY[i] * blockSize, blockSize, blockSize);
  }
}

function drawApple() {
  var c = color(255, 0, 0);
  fill(c);
  rect(appleX * blockSize, appleY * blockSize, blockSize, blockSize);
}

function updateSnake() {
  if (directionIntentX !== 0 && directionX === 0) {
    directionX = directionIntentX;
    directionY = 0;
  }
  if (directionIntentY !== 0 && directionY === 0) {
    directionX = 0;
    directionY = directionIntentY;
  }

  directionIntentX = 0;
  directionIntentY = 0;

  playerX.unshift(playerX[0] + directionX);
  while (playerX.length > snakeSize) playerX = shorten(playerX);

  playerY.unshift(playerY[0] + directionY);
  while (playerY.length > snakeSize) playerY = shorten(playerY);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    directionIntentX = 0;
    directionIntentY = -1;
  } else if (keyCode === LEFT_ARROW) {
    directionIntentX = -1;
    directionIntentY = 0;
  } else if (keyCode === DOWN_ARROW) {
    directionIntentX = 0;
    directionIntentY = 1;
  } else if (keyCode === RIGHT_ARROW) {
    directionIntentX = 1;
    directionIntentY = 0;
  }
  // } else if (keyCode === ENTER) {
  //   gameStarted = true;
  //   directionIntentX = 1;
  // }
}

function positionSnake(posX, posY) {
  for (i = 0; i < snakeSize; i++) {
    playerX[i] = posX;
    playerY[i] = posY;
  }
}

function collisionCheck() {
  if (playerX[0] === appleX && playerY[0] === appleY) {
    appleX = Math.floor((Math.random() * windowWidth) / blockSize);
    appleY = Math.floor((Math.random() * windowHeight) / blockSize);
    snakeSize += 1;
    points += 1;
  }

  if (
    playerX[0] < 0 ||
    playerX[0] * blockSize > windowWidth ||
    playerY[0] < 0 ||
    playerY[0] * blockSize > windowHeight
  ) {
    resetSnake();
  }
}
