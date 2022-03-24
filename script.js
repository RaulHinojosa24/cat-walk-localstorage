// Estado de la APP
let moveCat = (localStorage.moveCat) ? JSON.parse(localStorage.moveCat) : false;
// console.log(moveCat);
let pixelsMove = (localStorage.pixelsMove) ? +localStorage.pixelsMove : 10;
document.forms["catConf"].elements["velocidad"].value = pixelsMove;
// console.log(pixelsMove);
let volume = (localStorage.volume) ? +localStorage.volume : 0.5;
document.forms["catConf"].elements["volumen"].value = volume;
// console.log(volume);
let walkForwards = true;

// Variables globales
const img = document.querySelector('img');
img.style.left = '0px';

// Música!
const audio = new Audio('./lambada.mp3');
audio.volume = volume;
if (moveCat) audio.play();

// escuchar evento submit de formulario
document.querySelector("form").addEventListener("submit", e => e.preventDefault());
document.querySelector("form").addEventListener("input", procesarValoresFormulario);

// evento click al botón Bailar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Bailar"
// 2. Actualizar la variable de estado 'moveCat' a true
// 3. Ejecutar el método .play del objeto 'audio'

let bailarBtn = document.querySelector("#bailar");
bailarBtn.addEventListener("click", function () {
    localStorage.moveCat = true;
    moveCat = true;
    audio.play();
});

// evento click al botón Parar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Parar"
// 2. Actualizar la variable de estado 'moveCat' a false
// 3. Ejecutar el método .pause del objeto 'audio'

let pararBtn = document.querySelector("#parar");
pararBtn.addEventListener("click", function () {
    localStorage.moveCat = false;
    moveCat = false;
    audio.pause();
});


function catWalk() {

    let currentLeft = parseInt(img.style.left);

    if (walkForwards && (currentLeft > (window.innerWidth - img.width))) {
        walkForwards = false;
        img.style.transform = "rotateY(180deg)";
    }
    if (!walkForwards && (currentLeft <= 0)) {
        walkForwards = true;
        img.style.transform = "";
    }

    // Ejercicio 4

    if (walkForwards) {
        img.style.left = (currentLeft + pixelsMove) + 'px';
    } else {
        img.style.left = (currentLeft - pixelsMove) + 'px';
    }
}


function procesarValoresFormulario(event) {
    // no 'recargues' la página
    event.preventDefault();

    // acceder al input que tiene el name="velocidad"
    const velocidad = document.forms["catConf"].elements["velocidad"].value;

    // Ejercicio 4
    pixelsMove = +velocidad;
    localStorage.pixelsMove = pixelsMove;

    // Ejercicio 5
    const volumen = document.forms["catConf"].elements["volumen"].value;
    audio.volume = volume = +volumen;
    localStorage.volume = volume;
}


setInterval(function () {
    // Ejercicio 1: Comprobar una variable de estado aquí y hacer un return inmediatamente sería una buena opción; si dicha variable nos dice que el gato no debe moverse.

    if (!moveCat) {
        return;
    }

    catWalk();
}, 50);