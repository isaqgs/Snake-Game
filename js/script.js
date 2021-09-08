let highscore = 0
let box = 32
let food = {
    x: 0,
    y: 0
}
let canvas = document.querySelector('canvas').getContext('2d')
let score, direction, snake, atualizar

window.addEventListener("keydown", (e) => {

    if (e.key == 'ArrowRight' && direction != 'ArrowLeft' || e.key == 'ArrowLeft' && direction != 'ArrowRight' || e.key == 'ArrowUp' && direction != 'ArrowDown' || e.key == 'ArrowDown' && direction != 'ArrowUp') {

        direction = e.key

    }

})

startGame()

function startGame() {
    score = 0
    document.getElementById("score").textContent = score
    snake = [{
        x: 0,
        y: 0
    }]
    direction = "ArrowRight"

    newFood()

    atualizar = setInterval(() => {

        draw()

        eatFood()

        if (perdeu()) {
            clearInterval(atualizar)
            if (confirm('Você perdeu! Deseja reiniciar?')) startGame()
        }

    }, 1000 / 15)
}

function draw() {

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'ArrowRight') {
        snakeX += box
    }
    if (direction == 'ArrowLeft') {
        snakeX -= box
    }
    if (direction == 'ArrowUp') {
        snakeY -= box
    }
    if (direction == 'ArrowDown') {
        snakeY += box
    }

    snake.unshift({
        x: snakeX,
        y: snakeY
    })

    canvas.clearRect(0, 0, 1024, 512)

    canvas.fillStyle = "#ff0000"
    canvas.fillRect(food.x, food.y, box, box)

    canvas.fillStyle = "#03fcc2"

    snake.forEach(pos => {
        canvas.fillRect(pos.x, pos.y, box, box)
    })

}

function eatFood() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        updateScore()
        newFood()
    } else {
        snake.pop()
    }
}

function newFood() {
    food.x = Math.floor(Math.random() * 32 + 0) * box
    food.y = Math.floor(Math.random() * 16 + 0) * box
}

function updateScore() {
    score++
    document.getElementById("score").textContent = score
    if (score > highscore) {
        highscore = score
        document.getElementById("highscore").textContent = highscore
    }
}

function perdeu() {
    if (snake[0].x == 1024 || snake[0].x == -box || snake[0].y == -box || snake[0].y == 512) {
        return true
    } else {
        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                return true
            }
        }
        return false
    }
}