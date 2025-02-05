//Ordenar por orden alfabetico
let cadena1 = prompt("Introduce las palabras:");
let myArrayCadenas = cadena1.split(",");
myArrayCadenas.sort((a, b) => a.localeCompare(b));
for (let i = 0; i < myArrayCadenas.length; i++) {
  console.log("<br>" + myArrayCadenas[i]);
}