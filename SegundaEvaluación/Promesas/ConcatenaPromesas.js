//Funcion que devuelve una promesa que resuelve pasado un tiempo
function delayPromise(message, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}
