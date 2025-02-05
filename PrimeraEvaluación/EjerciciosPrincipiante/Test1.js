/*Ejercicio Por Consola 'Solicita al usuario su color favorito y despues poner por pantalla el color en hexadecimal, decimal y binario'*/
colorFavorito = prompt("¿Cual es tu color favorito?");
colorFavoritoHexaDecimal = colorFavorito;
colorFavoritoDecimal = colorFavorito;
colorFavoritoBinario = colorFavorito;
colorFavoritoDecimal = parseInt(colorFavoritoDecimal, 10);
colorFavoritoBinario = parseInt(colorFavoritoBinario, 2);
console.log(
  "<br>" + ("El color en Hexadecimal es: " + colorFavoritoHexaDecimal)
);
console.log("<br>" + ("El color en Decimal es: " + colorFavoritoDecimal));
console.log("<br>" + ("El color en Binario es: " + colorFavoritoBinario));

color782 = prompt("Introduce 782:");
color782Binario = parseInt(color782, 2);
color782Ocatal = parseInt(color782, 8);
color782Decimal = parseInt(color782, 10);
color782HexaDecimal = parseInt(color782, 16);
console.log("<br>" + ("El color en Binario es: " + color782Binario));
console.log("<br>" + ("El color en Octal es: " + color782Ocatal));
console.log("<br>" + ("El color en Decimal es: " + color782Decimal));
console.log("<br>" + ("El color en Hexadecimal es: " + color782HexaDecimal));
color782Binario.toString(2);
color782Ocatal.toString(8);
color782Decimal.toString(10);
color782HexaDecimal.toString(16);
console.log("<br>" + ("El color en Binario es: " + color782Binario));
console.log("<br>" + ("El color en Octal es: " + color782Ocatal));
console.log("<br>" + ("El color en Decimal es: " + color782Decimal));
console.log("<br>" + ("El color en Hexadecimal es: " + color782HexaDecimal));



console.log("<br>" + (ahora = new Date()));
const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
console.log(
  "<br>" + (ahora.getFullYear(), ahora.getMonth(), ahora.getDate())
);
console.log(
  "<br>" + (ahora.getHours(), ahora.getMinutes(), ahora.getSeconds())
);
console.log(
  "<br>" +
    (dias[ahora.getDay()],
    ahora.getDate(),
    meses[ahora.getMonth()],
    ahora.getFullYear())
);







let myArrayFrutas = [];
console.log(
  "<br>Longitud de la pila: " +
    myArrayFrutas.unshift(prompt("Introduce una fruta:"))
);
for (let i = 0; i < myArrayFrutas.length; i++) {
  console.log("<br>" + myArrayFrutas[i]);
}
console.log(
  "<br>Longitud de la pila: " +
    myArrayFrutas.unshift(prompt("Introduce una fruta:"))
);
console.log("<br> Mostramos la pila:");
for (let i = 0; i < myArrayFrutas.length; i++) {
  console.log("<br>" + myArrayFrutas[i]);
}
console.log("<br>Eliminamos el ultimo: " + myArrayFrutas.pop());
console.log("<br> Mostramos la pila:");
for (let i = 0; i < myArrayFrutas.length; i++) {
  console.log("<br>" + myArrayFrutas[i]);
}

