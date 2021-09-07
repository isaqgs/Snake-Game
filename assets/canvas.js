let ctn = {
    W: document.querySelector("#jogo").width,
    H: document.querySelector("#jogo").height,
    ctx: document.querySelector("#jogo").getContext('2d')
}

let snake = {
    px: 0,
    py: 0,
    vel: 10,
    width: 20,
    height: 20,

    draw() {

        if (input.cima && this.py > 0) {
            this.py -= this.vel
        }

        if (input.baixo && this.py < ctn.H - this.height) {
            this.py += this.vel
        }

        if (input.direita && this.px < ctn.W - this.width) {
            this.px += this.vel
        }

        if (input.esquerda && this.px > 0) {
            this.px -= this.vel
        }

        teste (snake.px, snake.py)

        ctn.ctx.fillStyle = "rgb(200,0,0)"
        ctn.ctx.fillRect(this.px, this.py, snake.width, snake.height)

        window.requestAnimationFrame(() => this.draw()) 
        
    }
}

function teste(x, y) {

    setTimeout(() => {
        ctn.ctx.clearRect(x, y, 20, 20)
    }, 240);

}

window.onload = () => {

    window.requestAnimationFrame(() => snake.draw())

}

// let ctn = {
//     W: document.querySelector("#jogo").width,
//     H: document.querySelector("#jogo").height,
//     ctx: document.querySelector("#jogo").getContext('2d')
// }

// let snake = {
//     px: 50,
//     py: 50,
//     vel: 5,
//     width: 20,
//     height: 20,

//     bpx: this.px - this.width, 
//     bpy: this.py,

//     draw() {

//         if (input.cima && this.py > 0) {
//             this.py -= this.vel
//             this.bpx = this.px
//             this.bpy = this.py + this.height
//         }

//         if (input.baixo && this.py < ctn.H - this.height) {
//             this.py += this.vel
//             this.bpx = this.px
//             this.bpy = this.py - this.height
//         }

//         if (input.direita && this.px < ctn.W - this.width) {
//             this.px += this.vel
//             this.bpx = this.px - this.width
//             this.bpy = this.py
//         }

//         if (input.esquerda && this.px > 0) {
//             this.px -= this.vel
//             this.bpx = this.px + this.width
//             this.bpy = this.py
//         }

//         console.log(this.bpx, this.bpy);

//         ctn.ctx.clearRect(0, 0, ctn.W, ctn.H)
//         ctn.ctx.fillStyle = "rgb(200,0,0)"
//         ctn.ctx.fillRect(this.px, this.py, snake.width, snake.height)
//         ctn.ctx.fillRect(this.bpx, this.bpy, snake.width, snake.height)

//         window.requestAnimationFrame(() => this.draw()) 
        
//     }
// }

// window.onload = () => {

//     window.requestAnimationFrame(() => snake.draw())

// }