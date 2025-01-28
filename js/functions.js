var siguiente = false;

function turno(boton) {
    boton.disabled = true;

    if (siguiente == false) {
        boton.value = "X";
    } else {
        boton.value = "O";
    }
    siguiente = !siguiente;
    document.getElementById("Turno").innerHTML = siguiente ? "Turno: X" : "Turno: O";
}

function verificar() {

}