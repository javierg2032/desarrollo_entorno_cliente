//Preguntar al usuario si quiere añadir o quitar algo a la pila o terminar con ella (nos muestra la longitud de la pila y como queda)
let myArrayFIFO = [];
do {
  respuesta = prompt("¿Que quieres hacer con la pila?");
  if (respuesta == "a") {
    console.log(
      "<br>Longitud de la pila: " +
        myArrayFIFO.unshift(
          prompt("Introduce lo que quieres añadir a la pila:")
        )
    );
    console.log("<br> Mostramos la pila:");
    for (let i = 0; i < myArrayFIFO.length; i++) {
      console.log("<br>" + myArrayFIFO[i]);
    }
  } else if (respuesta == "q") {
    console.log(
      "<br>Has quitado de la pila: " +
        myArrayFIFO.pop() +
        "<br>Longitud de la pila: " +
        myArrayFIFO.length
    );
    console.log("<br> Mostramos la pila:");
    for (let i = 0; i < myArrayFIFO.length; i++) {
      console.log("<br>" + myArrayFIFO[i]);
    }
  } else if (respuesta != "FIN") {
    console.log("<br><br> ERROR:Opción no valida <br><br>");
    confirm("La opción introducida no es valida, intentalo de nuevo");
  }
} while (respuesta != "FIN");

document.getElementById("pila").innerHTML="La pila final es: " + myArrayFIFO;
document.getElementById("tamanio").innerHTML="El tamaño de la pila final es: " + myArrayFIFO.length;