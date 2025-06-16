// Fechas y tiempo en JavaScript

const ahora = new Date();
console.log("Fecha actual:", ahora.toLocaleString());

console.log("Timestamp:", Date.now());

const inicio = Date.now();
// código que tarda algo...
const fin = Date.now();
console.log("Duración:", fin - inicio, "ms");
