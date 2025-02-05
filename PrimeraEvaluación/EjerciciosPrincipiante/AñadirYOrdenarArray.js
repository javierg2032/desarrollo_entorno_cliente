// Añadir numeros manualmente a un array y ordenarlos
let numeros = prompt("Introduce los números:");
const myArray = numeros.split(",");
console.log("<br>" + "Array segun ingreso:");
console.log("<br>" + myArray[0]);
console.log("<br>" + myArray[1]);
console.log("<br>" + myArray[2]);
console.log("<br>" + myArray[3]);
console.log("<br>" + "Array ordenado de menor a mayor:");
myArray.sort(function (a, b) {
  return a - b;
});
console.log("<br>" + myArray[0]);
console.log("<br>" + myArray[1]);
console.log("<br>" + myArray[2]);
console.log("<br>" + myArray[3]);
console.log("<br>" + "Array ordenado de mayor a menor:");
myArray.reverse();
console.log("<br>" + myArray[0]);
console.log("<br>" + myArray[1]);
console.log("<br>" + myArray[2]);
console.log("<br>" + myArray[3]);