let hsCookie = {
    hs: document.cookie.split("=")[1],

    setHsCookie(value) {
        expires = new Date('8 Sep 2022 00:00:00 GMT')
        document.cookie = `highscore=${value}; expires=${expires.toUTCString()}`
        this.hs = document.cookie.split("=")[1]
    },
}

if (!document.cookie.split(';').some((item) => item.trim().startsWith('highscore='))) {
    hsCookie.setHsCookie(0)
}
 
const audio = {
    moviment: {
        audio: new Audio('./assets/audio/beep2.wav'),
        play() {
            this.audio.load()
            this.audio.play()
        }
    },

    eat: {
        audio: new Audio('./assets/audio/beep1.wav'),
        play() {
            this.audio.play()
        }
    },

    death: {
        audio: new Audio('./assets/audio/death.wav'),
        play() {
            this.audio.play()
        }
    }
}

const divHs = document.getElementById("highscore")
divHs.textContent = hsCookie.hs

const box = 32
let food = {
    x: 0,
    y: 0
}

const canvas = document.querySelector('canvas').getContext('2d')

let start = false

let score, newDirection, snake, atualizar, actualDirection

const menu = document.getElementById("menu")
const button = document.querySelector("img")

window.addEventListener("keydown", (e) => {

    if (start) {
        if (actualDirection != e.key) {
            if (e.key == 'ArrowRight' && actualDirection != 'ArrowLeft' || e.key == 'ArrowLeft' && actualDirection != 'ArrowRight' || e.key == 'ArrowUp' && actualDirection != 'ArrowDown' || e.key == 'ArrowDown' && actualDirection != 'ArrowUp') {
    
                newDirection = e.key
                audio.moviment.play()
        
            }
        }
    } else {
        if (e.key == 'Enter') {

            startGame()

        }
    }

})

function startGame() {
    start = true

    menu.style.display = "none"
    
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
            start = false
            audio.death.play()
            clearInterval(atualizar)
            menu.style.display = "block"
            button.src = "assets/svg/reset.svg"
            document.getElementById("titulo").textContent = "Game Over"
        }

    }, 1000 / 15)
}

function draw() {

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (newDirection == 'ArrowRight') {
        snakeX += box
    }
    if (newDirection == 'ArrowLeft') {
        snakeX -= box
    }
    if (newDirection == 'ArrowUp') {
        snakeY -= box
    }
    if (newDirection == 'ArrowDown') {
        snakeY += box
    }

    actualDirection = newDirection

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
    audio.eat.play()
    document.getElementById("score").textContent = score
    if (score > hsCookie.hs) {
        hsCookie.setHsCookie(score)
        divHs.textContent = hsCookie.hs
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