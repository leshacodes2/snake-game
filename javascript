// Game constants
const BOARD_SIZE = 400;
const TILE_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 10;

// Game variables
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = "right";
let score = 0;
let speed = INITIAL_SPEED;
let gameLoop;

// Game board element
const gameBoard = document.querySelector(".game-board");

// Function to generate a random position for the food
function generateFood() {
  food.x = Math.floor(Math.random() * (BOARD_SIZE / TILE_SIZE)) * TILE_SIZE;
  food.y = Math.floor(Math.random() * (BOARD_SIZE / TILE_SIZE)) * TILE_SIZE;
}

// Function to draw the snake and food on the game board
function draw() {
  // Clear the game board
  gameBoard.innerHTML = "";

  // Draw the snake
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = segment.x + "px";
    snakeElement.style.top = segment.y + "px";
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  // Draw the food
  const foodElement = document.createElement("div");
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

// Function to update the game state
function update() {
  // Update the snake position based on the direction
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y -= TILE_SIZE;
      break;
    case "down":
      head.y += TILE_SIZE;
      break;
    case "left":
      head.x -= TILE_SIZE;
      break;
    case "right":
      head.x += TILE_SIZE;
      break;
  }

  // Check for collision with the food
  if (head.x === food.x && head.y === food.y) {
    // Increase the score
    score++;

    // Generate new food position
    generateFood();

    // Increase the speed
    speed -= SPEED_INCREMENT;

    // Add a new segment to the snake
    snake.push({});
  } else {
    // Remove the tail segment
    snake.pop();
  }

  // Check for collision with the game board boundaries
  if (
    head.x < 0 ||
    head.x >= BOARD_SIZE ||
    head.y < 0 ||
    head.y >= BOARD_SIZE
  ) {
    // Game over
    clearInterval(gameLoop);
    alert("Game Over!\n\nYour Score: " + score);
    return;
  }

  // Check for collision with the snake's own body
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Game over
      clearInterval(gameLoop);
      alert("Game Over!\n\nYour Score: " + score);
      return;
    }
  }

  // Add the new head segment to the snake
  snake.unshift(head);

  // Draw the updated game state
  draw();
}

// Function to handle keyboard input for changing the direction
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "
