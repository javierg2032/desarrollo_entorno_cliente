/*Promesa construirClase (tarda 5000 ms), despues de hacer eso, 
Promesa pintarClase (tarda 3000ms), despues de hacer eso, 
Promesa traerMuebles (tarda 2000 ms), al terminar TODAS las Promesas, 
imprimir "Obra Iniciada"*/

//Funcion vista en clase aplicada al ejercicio de clase
function delayPromise(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

function ejecutaSecuenciaPromesas() {
  return delayPromise("Clase construida", 5000).then((result) => {
    console.log(result);
    return delayPromise("Clase pintada", 3000).then((result) => {
      console.log(result);
      return delayPromise("Muebles traidos", 2000).then((result) => {
        console.log(result);
        console.log("Obra iniciada");
      });
    });
  });
}

//Llamada a la función
ejecutaSecuenciaPromesas();
