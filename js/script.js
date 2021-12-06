/* VARIÁVEIS GLOBAIS */
const box = 32
let food = {
    x: 0,
    y: 0
}

const canvas = document.querySelector('canvas').getContext('2d')

let start = false

let qntdGrow = 0

let score, newDirection, snake, atualizar, actualDirection, snakeX, snakeY

const menu = document.getElementById("menu")
const button = document.querySelector("img")
const divHs = document.getElementById("highscore")

const grow = 4
const fps = 50
const velocidade = 8

/* COOKIES-HIGHSCORE */
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

divHs.textContent = hsCookie.hs

/* AUDIO */
let audio = {
    moviment() {
        let audio = new Audio('./assets/audio/beep2.wav')
        audio.play()
    },
    eat() {
        let audio = new Audio('./assets/audio/beep1.wav')
        audio.play()
    },
    death() {
        let audio = new Audio('./assets/audio/death.wav')
        audio.play()
    }
}

/* EVENTO RESPONSÁVEL POR DETECTAR A TECLA PRESSIONADA */
window.addEventListener("keydown", (e) => {

    if (start) {
        if (actualDirection != e.key) {
            if (e.key == 'ArrowRight' && actualDirection != 'ArrowLeft' || e.key == 'ArrowLeft' && actualDirection != 'ArrowRight' || e.key == 'ArrowUp' && actualDirection != 'ArrowDown' || e.key == 'ArrowDown' && actualDirection != 'ArrowUp') {

                newDirection = e.key
                audio.moviment()

            }
        }
    } else {
        if (e.key == 'Enter') {

            startGame()

        }
    }

})

/* FUNÇÃO RESPONSÁVEL POR INICIAR O JOGO */
function startGame() {
    clearInterval(atualizar)

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

        if (snake[0].x == 1024 || snake[0].x == -box || snake[0].y == -box || snake[0].y == 512) {
            fimDeJogo()
        } else {
            for (i = 1; i < snake.length; i++) {
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                    return fimDeJogo(snake[i].x, snake[i].y)
                }
            }
        }

    }, 1000 / fps)
}

/* FUNÇÃO RESPONSÁVEL DESENHAR CADA FRAME DO JOGO */
function draw() {

    if (snake[0].x % 32 == 0 && snake[0].y % 32 == 0) {
        if (newDirection == 'ArrowRight') {
            snakeX = velocidade
            snakeY = 0
        }
        if (newDirection == 'ArrowLeft') {
            snakeX = -velocidade
            snakeY = 0
        }
        if (newDirection == 'ArrowUp') {
            snakeY = -velocidade
            snakeX = 0
        }
        if (newDirection == 'ArrowDown') {
            snakeY = velocidade
            snakeX = 0
        }        
        actualDirection = newDirection
    }

    snake.unshift({
        x: snake[0].x + snakeX,
        y: snake[0].y + snakeY
    })

    if (snake[0].x == food.x && snake[0].y == food.y) {
        updateScore()
        newFood()
        qntdGrow += grow
    }
    
    if (qntdGrow == 0){
        snake.pop()
    } else {
        qntdGrow--
    }

    canvas.clearRect(0, 0, 1024, 512)

    canvas.fillStyle = "#ff0000"
    canvas.fillRect(food.x, food.y, box, box)

    canvas.fillStyle = "#03fcc2"

    snake.forEach(pos => {
        canvas.fillRect(pos.x, pos.y, box, box)
    })

}

/* FUNÇÃO RESPONSÁVEL POR CRIAR UMA NOVA COMIDA */
function newFood() {
    food.x = Math.floor(Math.random() * 32 + 0) * box
    food.y = Math.floor(Math.random() * 16 + 0) * box

    for (let i = 0; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            return newFood()
        }
    }
}

/* FUNÇÃO RESPONSÁVEL POR ATUALIZAR A PONTUAÇÃO DO JOGO */
function updateScore() {
    score++
    audio.eat()
    document.getElementById("score").textContent = score
    if (score > hsCookie.hs) {
        hsCookie.setHsCookie(score)
        divHs.textContent = hsCookie.hs
    }
}

/* FUNÇÃO RESPONSÁVEL POR TERMINAR O JOGO */
function fimDeJogo(x, y) {
    if (x) {
        canvas.fillStyle = "#03daa8"
        canvas.fillRect(x, y, box, box)
    }
    clearInterval(atualizar)
    start = false
    audio.death()
    menu.style.display = "block"
    button.src = "assets/svg/reset.svg"
    document.getElementById("titulo").textContent = "Game Over"
}