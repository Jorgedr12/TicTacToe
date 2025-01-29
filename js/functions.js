var siguiente = false;

function turno(boton) {
    boton.disabled = true;

    if (siguiente == false) {
        boton.value = "X";
    } else {
        boton.value = "O";
    }
    siguiente = !siguiente;
    document.getElementById("Turno").innerHTML = siguiente ? "Turno: O" : "Turno: X";
    verificar();

    if (document.getElementById("Ganador").innerHTML == "Gana: X" || document.getElementById("Ganador").innerHTML == "Gana: O" || document.getElementById("Ganador").innerHTML == "Empate") {
        var botones = document.querySelectorAll("input[type=button]");
        for (var i = 0; i < botones.length; i++) {
            botones[i].disabled = true;
        }
        var turno = document.getElementById("Turno");
        turno.innerHTML = "Juego Terminado";
    }
}

function verificar() {
    var botones = document.querySelectorAll("input[type=button]");
    var ganador = null;

    // Combinaciones ganadoras
    var combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (var i = 0; i < combinaciones.length; i++) {
        var [a, b, c] = combinaciones[i];
        if (botones[a].value == botones[b].value &&
            botones[b].value == botones[c].value &&
            botones[a].value != "") {
            ganador = botones[a].value;
            break;
        }
    }

    if (ganador) {
        document.getElementById("Ganador").innerHTML = `Gana: ${ganador}`;
        return;
    }

    var contador = 0;

    for (var i = 0; i < botones.length; i++) {
        if (botones[i].value != "") {
            contador++;
        }
    }

    if (contador == 9) {
        document.getElementById("Ganador").innerHTML = "Empate";
    }
}

// function bloquear() {
//     var botones = document.querySelectorAll("input[type=button]");

//     for (let i = 0; i < botones.length; i++) {
//         botones[i].disabled = true;
//     }
// }
