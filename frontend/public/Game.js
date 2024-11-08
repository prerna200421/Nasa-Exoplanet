const bird = document.getElementById('bird');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');

let birdY = gameArea.clientHeight / 2;
let birdSpeed = 0;
let gravity = 0.5;
let isGameOver = false;
let isGamePaused = false;
let score = 0;
let gameInterval;
let pipes = [];
let pipeSpeed = 2;  // Speed of the pipes moving from right to left
let pipeFrequency = 2000;  // Time interval between pipes generation (2 seconds)

// Start button event
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
stopBtn.addEventListener('click', stopGame);

// Event listener for jumping (flapping)
document.addEventListener('keydown', flap);
document.addEventListener('click', flap);

function flap() {
    if (!isGameOver && !isGamePaused) {
        birdSpeed = -8;
    }
}

// Start the game loop
function startGame() {
    if (isGamePaused) {
        resumeGame();
    } else {
        resetGame();
        gameInterval = setInterval(gameLoop, 20);
        generatePipes();  // Start generating pipes
    }
}

function gameLoop() {
    if (!isGamePaused) {
        birdSpeed += gravity;
        birdY += birdSpeed;
        bird.style.top = birdY + 'px';

        if (birdY < 0 || birdY > gameArea.clientHeight - bird.clientHeight) {
            endGame();
        }

        checkCollision();
    }
}

// Function to generate and move pipes
function generatePipes() {
    const pipeInterval = setInterval(() => {
        if (isGameOver || isGamePaused) return;

        // Ensure pipes don't overlap by generating one set of pipes every interval
        const pipeHeight = Math.random() * 200 + 100;  // Random height for the bottom pipe
        const gap = 200;  // Gap for the spaceship

        // Create bottom pipe
        const bottomPipe = document.createElement('div');
        bottomPipe.classList.add('pipe');
        bottomPipe.style.height = pipeHeight + 'px';
        bottomPipe.style.top = (gameArea.clientHeight - pipeHeight) + 'px';
        bottomPipe.style.left = gameArea.clientWidth + 'px';
        gameArea.appendChild(bottomPipe);

        // Create top pipe
        const topPipe = document.createElement('div');
        topPipe.classList.add('pipe');
        topPipe.style.height = (gameArea.clientHeight - pipeHeight - gap) + 'px';
        topPipe.style.top = '0px';
        topPipe.style.left = gameArea.clientWidth + 'px';
        gameArea.appendChild(topPipe);

        // Add pipes to the array for movement and collision detection
        pipes.push({ top: topPipe, bottom: bottomPipe });

    }, pipeFrequency);

    // Move pipes and remove them when out of bounds
    const movePipesInterval = setInterval(() => {
        pipes.forEach((pipePair, index) => {
            const { top, bottom } = pipePair;

            // Move pipes leftward
            const currentLeft = parseFloat(top.style.left);
            if (currentLeft <= -60) {
                // Remove pipes from DOM if they go off-screen
                top.remove();
                bottom.remove();
                pipes.splice(index, 1);  // Remove the pipe pair from the array

                // Increment score when the pipe passes the bird
                score++;
                scoreElement.textContent = "Score: " + score;
            } else {
                // Move the pipes left
                top.style.left = (currentLeft - pipeSpeed) + 'px';
                bottom.style.left = (currentLeft - pipeSpeed) + 'px';
            }
        });

        // Stop pipes if the game is over
        if (isGameOver) {
            clearInterval(pipeInterval);
            clearInterval(movePipesInterval);
        }

    }, 16);  // Smooth movement (approx. 60 FPS)
}

function checkCollision() {
    pipes.forEach(pipePair => {
        const birdRect = bird.getBoundingClientRect();
        const topPipeRect = pipePair.top.getBoundingClientRect();
        const bottomPipeRect = pipePair.bottom.getBoundingClientRect();

        if ((birdRect.left < topPipeRect.left + topPipeRect.width &&
             birdRect.left + birdRect.width > topPipeRect.left &&
             birdRect.top < topPipeRect.top + topPipeRect.height &&
             birdRect.height + birdRect.top > topPipeRect.top) ||
            (birdRect.left < bottomPipeRect.left + bottomPipeRect.width &&
             birdRect.left + birdRect.width > bottomPipeRect.left &&
             birdRect.top < bottomPipeRect.top + bottomPipeRect.height &&
             birdRect.height + birdRect.top > bottomPipeRect.top)) {
            endGame();
        }
    });
}

function pauseGame() {
    if (!isGameOver) {
        isGamePaused = !isGamePaused;
        pauseBtn.textContent = isGamePaused ? 'Resume' : 'Pause';
    }
}

function stopGame() {
    isGameOver = true;
    isGamePaused = false;
    clearInterval(gameInterval);
    pipes.forEach(pipe => {
        pipe.top.remove();
        pipe.bottom.remove();
    });
    pipes = [];
    scoreElement.textContent = "Score: 0";
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
}

function resetGame() {
    isGameOver = false;
    isGamePaused = false;
    birdY = gameArea.clientHeight / 2;
    birdSpeed = 0;
    pipes.forEach(pipe => {
        pipe.top.remove();
        pipe.bottom.remove();
    });
    pipes = [];
    score = 0;
    scoreElement.textContent = "Score: 0";
}

function resumeGame() {
    isGamePaused = false;
    gameInterval = setInterval(gameLoop, 20);
}

// Ensure the bird stays in the center when the window resizes
window.addEventListener('resize', () => {
    birdY = gameArea.clientHeight / 2;
});