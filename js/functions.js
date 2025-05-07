var siguiente = false;
var currentImageX = './img/equis/x.png';
var currentImageO = './img/circulo/o.png';
var timeLeft = 180;
var timerInterval;
var gameActive = true;
var currentLineColor = '#000000';
var currentCellColor = '#ffffff';
var currentOtherCellColor = '#ffffff';

window.onload = function () {
    startTimer();
    aplicarColoresCeldas();
    cambiarColorLinea(currentLineColor);
};

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            endGameByTime();
        }
    }, 1000);
}

function updateTimerDisplay() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById("TiempoGlobal").innerHTML =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

function endGameByTime() {
    clearInterval(timerInterval);
    gameActive = false;

    var botones = document.querySelectorAll("table input[type=button]");
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    document.getElementById("Ganador").innerHTML = "Tiempo agotado!";
    document.getElementById("Turno").innerHTML = "Juego Terminado";
}

function turno(boton) {
    // Verificar si el botón ya tiene imagen
    if (!gameActive || boton.style.backgroundImage !== "") return;

    boton.disabled = true;

    if (!siguiente) {
        aplicarImagen(boton, currentImageX, 'X');
    } else {
        aplicarImagen(boton, currentImageO, 'O');
    }

    siguiente = !siguiente;
    document.getElementById("Turno").innerHTML = siguiente ? "Turno: O" : "Turno: X";
    verificar();

    if (document.getElementById("Ganador").innerHTML.startsWith("Gana:") ||
        document.getElementById("Ganador").innerHTML == "Empate") {
        endGame();
    }
}

function aplicarImagen(boton, imagen, valor) {
    boton.style.backgroundImage = `url(${imagen})`;
    boton.style.backgroundSize = '80%'; // Tamaño relativo al botón
    boton.style.backgroundRepeat = 'no-repeat';
    boton.style.backgroundPosition = 'center';
    boton.value = valor; // Guardamos el valor para la verificación
    boton.textContent = ""; // Eliminamos cualquier texto
}

function verificar() {
    var botones = document.querySelectorAll("table input[type=button]");
    var ganador = null;
    var combinacionGanadora = null;

    var combinaciones = [
        { indices: [0, 1, 2], clase: 'win-row-1' },
        { indices: [3, 4, 5], clase: 'win-row-2' },
        { indices: [6, 7, 8], clase: 'win-row-3' },
        { indices: [0, 3, 6], clase: 'win-col-1' },
        { indices: [1, 4, 7], clase: 'win-col-2' },
        { indices: [2, 5, 8], clase: 'win-col-3' },
        { indices: [0, 4, 8], clase: 'win-diag-1' },
        { indices: [2, 4, 6], clase: 'win-diag-2' }
    ];

    for (var i = 0; i < combinaciones.length; i++) {
        var combo = combinaciones[i];
        var [a, b, c] = combo.indices;
        if (botones[a].value === botones[b].value &&
            botones[b].value === botones[c].value &&
            botones[a].value !== "") {
            ganador = botones[a].value;
            combinacionGanadora = combo.clase;
            break;
        }
    }

    if (ganador) {
        document.getElementById("Ganador").innerHTML = `Gana: ${ganador}`;
        document.querySelector("table").classList.add(combinacionGanadora);
        setTimeout(function () {
            alert("Juego terminado! Gana: " + ganador);
        }, 10);
        return;
    }

    // Verificar empate
    var empate = true;
    for (var i = 0; i < botones.length; i++) {
        if (botones[i].value === "") {
            empate = false;
            break;
        }
    }

    if (empate) {
        document.getElementById("Ganador").innerHTML = "Empate";
        setTimeout(function () {
            alert("Juego terminado! Empate");
        }, 10);
    }
}

function endGame() {
    clearInterval(timerInterval);
    gameActive = false;

    var botones = document.querySelectorAll("table input[type=button]");
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
    document.getElementById("Turno").innerHTML = "Juego Terminado";
}

function reiniciar() {
    clearInterval(timerInterval);
    gameActive = true;
    timeLeft = 180;

    updateTimerDisplay();
    startTimer();

    // Eliminar la clase de línea ganadora si existe
    var tabla = document.querySelector("table");
    tabla.className = 'tablero';  // Restablecer la clase

    // Reiniciar botones
    var botones = document.querySelectorAll("table input[type=button]");
    for (var i = 0; i < botones.length; i++) {
        botones[i].value = "";
        botones[i].disabled = false;
        botones[i].style.backgroundImage = "";
        botones[i].style.backgroundSize = "";
        botones[i].style.backgroundRepeat = "";
        botones[i].style.backgroundPosition = "";
        botones[i].style.width = "150px";
        botones[i].style.height = "150px";
        botones[i].style.fontSize = "80px";
        botones[i].style.backgroundColor = "transparent";
        botones[i].style.border = "none";
        botones[i].style.color = "transparent";
        botones[i].textContent = "";
    }

    // 🔥 Aplicar colores de celdas nuevamente
    aplicarColoresCeldas();

    siguiente = false;
    document.getElementById("Turno").innerHTML = "Turno: X";
    document.getElementById("Ganador").innerHTML = "";
}

function cambiarImagenX(image) {
    currentImageX = image;

    // Aplicar a todos los botones X existentes
    var botones = document.querySelectorAll("table input[type=button]");
    for (var i = 0; i < botones.length; i++) {
        if (botones[i].value === "X") {
            botones[i].style.backgroundImage = `url(${image})`;
            botones[i].style.backgroundSize = '80%';
            botones[i].style.backgroundRepeat = 'no-repeat';
            botones[i].style.backgroundPosition = 'center';
            botones[i].textContent = "";
        }
    }
}

function cambiarImagenO(image) {
    currentImageO = image;

    var botones = document.querySelectorAll("table input[type=button]");
    for (var i = 0; i < botones.length; i++) {
        if (botones[i].value === "O") {
            botones[i].style.backgroundImage = `url(${image})`;
            botones[i].style.backgroundSize = '80%';
            botones[i].style.backgroundRepeat = 'no-repeat';
            botones[i].style.backgroundPosition = 'center';
            botones[i].textContent = "";
        }
    }
}

function cambiarColorLinea(color) {
    currentLineColor = color;

    // Actualizar el CSS dinámicamente
    var style = document.createElement('style');
    style.innerHTML = `
        .win-row-1::after,
        .win-row-2::after,
        .win-row-3::after,
        .win-col-1::after,
        .win-col-2::after,
        .win-col-3::after,
        .win-diag-1::after,
        .win-diag-2::after {
            background-color: ${color} !important;
        }
    `;

    // Eliminar estilos anteriores si existen
    var oldStyle = document.getElementById('dynamic-line-style');
    if (oldStyle) {
        oldStyle.remove();
    }

    style.id = 'dynamic-line-style';
    document.head.appendChild(style);
}

function aplicarColoresCeldas() {
    var celdas = document.querySelectorAll('.tablero td');
    for (var i = 0; i < celdas.length; i++) {
        var fila = Math.floor(i / 3);
        var columna = i % 3;

        // Aplicar color según el patrón de ajedrez
        if ((fila + columna) % 2 === 0) {
            celdas[i].style.backgroundColor = currentCellColor;
        } else {
            celdas[i].style.backgroundColor = currentOtherCellColor;
        }

        // 🔥 Asegurar que el botón dentro de la celda herede el fondo
        var boton = celdas[i].querySelector('input[type="button"]');
        if (boton) {
            boton.style.backgroundColor = "transparent"; // Para que se vea el fondo de la celda
        }
    }
}

function cambiarColorCeldasAlternadas(color) {
    currentCellColor = color;
    aplicarColoresCeldas(); // Aplicar ambos colores
}

// Función para cambiar color de celdas impares
function cambiarColorOtrasCeldas(color) {
    currentOtherCellColor = color;
    aplicarColoresCeldas(); // Aplicar ambos colores
}