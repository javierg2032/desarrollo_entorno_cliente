//Preguntar al usuario si quiere añadir o quitar algo a la pila o terminar con ella (nos muestra la longitud de la pila y como queda)
let myArrayLIFO = [];
do {
  respuesta = prompt(
    "¿Qué quieres hacer con la pila? (a para añadir, q para quitar, FIN para terminar)"
  );
  if (respuesta == "a") {
    console.log(
      "Longitud de la pila: " +
        (myArrayLIFO.push(
          prompt("Introduce lo que quieres añadir a la pila:")
        ) || myArrayLIFO.length)
    );
    console.log("Mostramos la pila:");
    for (let i = 0; i < myArrayLIFO.length; i++) {
      console.log(myArrayLIFO[i]);
    }
  } else if (respuesta == "q") {
    if (myArrayLIFO.length > 0) {
      console.log(
        "Has quitado de la pila: " +
          myArrayLIFO.pop() +
          "\nLongitud de la pila: " +
          myArrayLIFO.length
      );
    } else {
      console.log("La pila está vacía, no puedes quitar nada.");
    }
    console.log("Mostramos la pila:");
    for (let i = 0; i < myArrayLIFO.length; i++) {
      console.log(myArrayLIFO[i]);
    }
  } else if (respuesta != "FIN") {
    console.log("ERROR: Opción no válida.");
    alert("La opción introducida no es válida, intentalo de nuevo.");
  }
} while (respuesta != "FIN");

document.getElementById("pila").innerHTML =
  "La pila final es: " + myArrayLIFO.join(", ");
document.getElementById("tamanio").innerHTML =
  "El tamaño de la pila final es: " + myArrayLIFO.length;
