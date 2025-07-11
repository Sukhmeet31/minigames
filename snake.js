document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.querySelector('.score span');
    const highScoreDisplay = document.querySelector('.high-score span');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    // Game variables
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreDisplay.textContent = highScore;
    
    // Snake
    let snake = [
        {x: 10, y: 10}
    ];
    let velocityX = 0;
    let velocityY = 0;
    
    // Food
    let foodX = 5;
    let foodY = 5;
    
    // Game loop
    function gameLoop() {
        // Clear canvas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Move snake
        const head = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};
        snake.unshift(head);
        
        // Check if snake ate food
        if (head.x === foodX && head.y === foodY) {
            score += 10;
            scoreDisplay.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }
        
        // Check collision with walls
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Check collision with self
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);
        
        // Draw snake
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
        
        // Slow down the snake by increasing the timeout (changed from 100 to 200)
        setTimeout(() => {
            requestAnimationFrame(gameLoop);
        }, 200); // Increased from 100ms to 200ms for slower movement
    }
    
    function placeFood() {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        
        // Make sure food doesn't spawn on snake
        for (let segment of snake) {
            if (segment.x === foodX && segment.y === foodY) {
                placeFood();
                return;
            }
        }
    }
    
    function gameOver() {
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }
    
    function resetGame() {
        snake = [{x: 10, y: 10}];
        velocityX = 0;
        velocityY = 0;
        score = 0;
        scoreDisplay.textContent = score;
        placeFood();
        
        if (confirm('Start new game?')) {
            gameLoop();
        }
    }
    
    // Control buttons
    document.getElementById('up-btn').addEventListener('click', () => {
        if (velocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
        }
    });
    
    document.getElementById('down-btn').addEventListener('click', () => {
        if (velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
        }
    });
    
    document.getElementById('left-btn').addEventListener('click', () => {
        if (velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
        }
    });
    
    document.getElementById('right-btn').addEventListener('click', () => {
        if (velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
        }
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (velocityY !== 1) {
                    velocityX = 0;
                    velocityY = -1;
                }
                break;
            case 'ArrowDown':
                if (velocityY !== -1) {
                    velocityX = 0;
                    velocityY = 1;
                }
                break;
            case 'ArrowLeft':
                if (velocityX !== 1) {
                    velocityX = -1;
                    velocityY = 0;
                }
                break;
            case 'ArrowRight':
                if (velocityX !== -1) {
                    velocityX = 1;
                    velocityY = 0;
                }
                break;
        }
    });
    
    resetBtn.addEventListener('click', resetGame);
    
    // Start game
    placeFood();
    gameLoop();
});