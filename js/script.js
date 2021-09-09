if (!document.cookie.split(';').some((item) => item.trim().startsWith('highscore='))) {
    setHighscoreCookie(0)
}

function setHighscoreCookie(value) {
    expires = new Date('8 Sep 2022 00:00:00 GMT')
    document.cookie = `highscore=${value}; expires=${expires.toUTCString()}`
}

function getHighscoreCookie() {
    return document.cookie.split("=")[1]
}

let divHs = document.getElementById("highscore")
divHs.textContent = getHighscoreCookie()

let box = 32
let food = {
    x: 0,
    y: 0
}
let canvas = document.querySelector('canvas').getContext('2d')
let score, newDirection, snake, atualizar, actualDirection

window.addEventListener("keydown", (e) => {

    if (e.key == 'ArrowRight' && actualDirection != 'left' || e.key == 'ArrowLeft' && actualDirection != 'right' || e.key == 'ArrowUp' && actualDirection != 'down' || e.key == 'ArrowDown' && actualDirection != 'up') {

        newDirection = e.key

    }

})

startGame()

function startGame() {
    score = 0
    document.getElementById("score").textContent = score
    snake = [{
        x: box,
        y: 0
    }]
    newDirection = "ArrowRight"

    newFood()

    atualizar = setInterval(() => {

        draw()

        if (perdeu()) {
            clearInterval(atualizar)
            if (confirm('Você perdeu! Deseja reiniciar?')) startGame()
        }

    }, 1000 / 15)
}

function draw() {

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (newDirection == 'ArrowRight') {
        snakeX += box
        actualDirection = "right"
    }
    if (newDirection == 'ArrowLeft') {
        snakeX -= box
        actualDirection = "left"
    }
    if (newDirection == 'ArrowUp') {
        snakeY -= box
        actualDirection = "up"
    }
    if (newDirection == 'ArrowDown') {
        snakeY += box
        actualDirection = "down"
    }

    snake.unshift({
        x: snakeX,
        y: snakeY
    })

    if (snake[0].x == food.x && snake[0].y == food.y) {
        updateScore()
        newFood()
    } else {
        snake.pop()
    }

    canvas.clearRect(0, 0, 1024, 512)

    canvas.fillStyle = "#ff0000"
    canvas.fillRect(food.x, food.y, box, box)

    canvas.fillStyle = "#03fcc2"

    snake.forEach(pos => {
        canvas.fillRect(pos.x, pos.y, box, box)
    })

}

function newFood() {
    food.x = Math.floor(Math.random() * 32 + 0) * box
    food.y = Math.floor(Math.random() * 16 + 0) * box

    for (let i = 0; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            return newFood()
        }
    }
}

function updateScore() {
    score++
    document.getElementById("score").textContent = score
    if (score > getHighscoreCookie()) {
        setHighscoreCookie(score)
        divHs.textContent = getHighscoreCookie()
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