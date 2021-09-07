let input = {

    direita: true,
    esquerda: false,
    cima: false,
    baixo: false,

}

window.addEventListener("keydown", (e) => {

    let tecla = e.key;

    switch (tecla) {
        case 'd':
        case 'ArrowRight':
            if (input.esquerda != true) {
                input.direita = true
                input.cima = false
                input.baixo = false
            }
            break

        case 'a':
        case 'ArrowLeft':
            if (input.direita != true) {
                input.esquerda = true
                input.cima = false
                input.baixo = false
            }
            break

        case 's':
        case 'ArrowDown':
            if (input.cima != true) {
                input.baixo = true
                input.esquerda = false
                input.direita = false
            }
            break

        case 'w':
        case 'ArrowUp':
            if (input.baixo != true) {
                input.cima = true
                input.esquerda = false
                input.direita = false
            }
            break
    }

});

// window.addEventListener("keyup", (e) => {

//     let tecla = e.key;

//     switch (tecla) {
//         case 'd':
//         case 'ArrowRight': 
//             input.direita = false
//         break

//         case 'a':
//         case 'ArrowLeft':
//             input.esquerda = false
//         break

//         case 's':
//         case 'ArrowDown':
//             input.baixo = false
//         break

//         case 'w':
//         case 'ArrowUp':
//             input.cima = false
//         break
//     }

// });