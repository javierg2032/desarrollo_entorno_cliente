/*let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let p3 = document.getElementById("p3");
let div = document.getElementById("div");
let p4 = document.getElementById("p4");
const parrafosDiv = div.querySelectorAll("p");*/

//Click
/* p1.addEventListener("click", function () {
    alert("Has hecho click en el P1");
  });
  p2.addEventListener("click", function () {
    alert("Has hecho click en el P2");
  });
  p3.addEventListener("click", function () {
    alert("Has hecho click en el P3");
  });
  div.addEventListener("click", function () {
    alert("Has hecho click en el Div");
  });

  for (let p of parrafosDiv) {
    p.addEventListener("click", function anadeTexto() {
      p4.innerText = p.innerHTML;

      //debe eliminarse el evento para que no se repita solamente en el parrafo 3
      if (p.id === "p3") {
        p.removeEventListener("click", anadeTexto);
        console.log("Se ha eliminado el evento");
      }
    });
  }*/

//MouesEnter y MouseLeave
/*for (let p of parrafosDiv) {

  p.addEventListener("mouseenter", function entraP() {
    console.log("Entra en " + p.id);
  });
  p.addEventListener("mouseleave", function saleP() {
    console.log("Sale de " + p.id);
  });
}*/

//CallBack es una funcion que se pasa como argumento o parametro a otra función
//Sintaxis CallBack
/*function operar(a, b, operacion) {
  return operacion(a, b);
}

//Ejemplo
function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplicacion(a, b) {
  return a * b;
}

function operar(a, b, suma) {
  return suma(a, b);
}

function operar(a, b, resta) {
  return resta(a, b);
}
function operar(a, b, multiplicacion) {
  return multiplicacion(a, b);
}*/

/*Forma de trabajar Sincrona (es Bloqueante, es decir que, hasta que no termina lo que esta haciendo no pasa a la siguiente)
 y Asincrona (puede seguir cualquier orden para hacer las cosas incluso sin haberlas terminado)*/

/*a = x * 7;
b = a + 6;
c = x + a + 5;*/

//Ejemplo setTimeout()

const myTimeout = setTimeout(despues, 3000);
function despues() {
  console.log("Terminados los 3000 ms");
}
console.log("Hola");


/*function verificarTelefono(numeroTelefono) {
  const telefonoValido1 = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos después del primero
  const telefonoValido2 = /^\+34\s[9|6|7][0-9]{8}$/; // Contiene el prefijo +34 junto con un espacio y comienza por 9, 6 o 7 y tiene 8 dígitos después del primero

  if (telefonoValido1.test(numeroTelefono) || telefonoValido2.test(numeroTelefono)) {
    return true;
  } else {
    return false;
  }
}*/