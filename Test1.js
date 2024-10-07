/*Ejercicio Por Consola 'Solicita al usuario su color favorito y despues poner por pantalla el color en hexadecimal, decimal y binario'*/
colorFavorito = prompt("¿Cual es tu color favorito?");
colorFavoritoHexaDecimal = colorFavorito;
colorFavoritoDecimal = colorFavorito;
colorFavoritoBinario = colorFavorito;
colorFavoritoDecimal = parseInt(colorFavoritoDecimal, 10);
colorFavoritoBinario = parseInt(colorFavoritoBinario, 2);
document.write(
  "<br>" + ("El color en Hexadecimal es: " + colorFavoritoHexaDecimal)
);
document.write("<br>" + ("El color en Decimal es: " + colorFavoritoDecimal));
document.write("<br>" + ("El color en Binario es: " + colorFavoritoBinario));

color782 = prompt("Introduce 782:");
color782Binario = parseInt(color782, 2);
color782Ocatal = parseInt(color782, 8);
color782Decimal = parseInt(color782, 10);
color782HexaDecimal = parseInt(color782, 16);
document.write("<br>" + ("El color en Binario es: " + color782Binario));
document.write("<br>" + ("El color en Octal es: " + color782Ocatal));
document.write("<br>" + ("El color en Decimal es: " + color782Decimal));
document.write("<br>" + ("El color en Hexadecimal es: " + color782HexaDecimal));
color782Binario.toString(2);
color782Ocatal.toString(8);
color782Decimal.toString(10);
color782HexaDecimal.toString(16);
document.write("<br>" + ("El color en Binario es: " + color782Binario));
document.write("<br>" + ("El color en Octal es: " + color782Ocatal));
document.write("<br>" + ("El color en Decimal es: " + color782Decimal));
document.write("<br>" + ("El color en Hexadecimal es: " + color782HexaDecimal));

/*Que devuelva "Texto+'A'+'B'" y despues "Texto+('A'+'B')"*/
a = 7;
b = 22;
document.write("<br>" + ("<br>Texto " + a + " " + b));
document.write("<br>" + ("<br>Texto " + (a + b)));

/*Que devuelva "'A'+'B'+Texto" y despues "('A'+'B')+Texto"*/
document.write("<br>" + ("<br>" + a + " " + b + " texto"));
document.write("<br>" + ("<br>" + (a + b) + " texto"));

a = 5;
b = a++; //'B' obtiene el valor de 'A' y despues a 'A' se le suma 1
c = ++a; //A 'A' se le suma 1 y despues 'C' obtiene el valor de 'A'
document.write("<br>" + (a + " " + b + " " + c));

document.write("<br>" + (ahora = new Date()));
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
document.write(
  "<br>" + (ahora.getFullYear(), ahora.getMonth(), ahora.getDate())
);
document.write(
  "<br>" + (ahora.getHours(), ahora.getMinutes(), ahora.getSeconds())
);
document.write(
  "<br>" +
    (dias[ahora.getDay()],
    ahora.getDate(),
    meses[ahora.getMonth()],
    ahora.getFullYear())
);

// Añadir numeros manualmente a un array y ordenarlos
let numeros = prompt("Introduce los números:");
const myArray = numeros.split(",");
document.write("<br>" + "Array segun ingreso:");
document.write("<br>" + myArray[0]);
document.write("<br>" + myArray[1]);
document.write("<br>" + myArray[2]);
document.write("<br>" + myArray[3]);
document.write("<br>" + "Array ordenado de menor a mayor:");
myArray.sort(function (a, b) {
  return a - b;
});
document.write("<br>" + myArray[0]);
document.write("<br>" + myArray[1]);
document.write("<br>" + myArray[2]);
document.write("<br>" + myArray[3]);
document.write("<br>" + "Array ordenado de mayor a menor:");
myArray.reverse();
document.write("<br>" + myArray[0]);
document.write("<br>" + myArray[1]);
document.write("<br>" + myArray[2]);
document.write("<br>" + myArray[3]);

//Comprobar si los días introducidos coinciden con el dia de hoy (cumpleaños)
document.write("<br>" + (hoy = new Date()));
let diasIntroducidos = prompt("Introduce los días:");
let myArrayDias = diasIntroducidos.split(",");
myArrayDias.sort(function (a, b) {
  return a - b;
});
for (let i = 0; i < myArrayDias.length; i++) {
  if (myArrayDias[i] == hoy.getDate()) {
    document.write(
      "<br>" + ("El día, " + myArrayDias[i] + " coincide con el dia de hoy")
    );
  } else
    document.write(
      "<br>" + ("El día, " + myArrayDias[i] + " no coincide con el dia de hoy")
    );
}

//Ordenar por orden alfabetico
let cadena1 = prompt("Introduce las palabras:");
let myArrayCadenas = cadena1.split(",");
myArrayCadenas.sort((a, b) => a.localeCompare(b));
for (let i = 0; i < myArrayCadenas.length; i++) {
  document.write("<br>" + myArrayCadenas[i]);
}

let myArrayFrutas = [];
document.write(
  "<br>Longitud del array: " +
    myArrayFrutas.unshift(prompt("Introduce una fruta:"))
);
for (let i = 0; i < myArrayFrutas.length; i++) {
  document.write("<br>" + myArrayFrutas[i]);
}
document.write(
  "<br>Longitud del array: " +
    myArrayFrutas.unshift(prompt("Introduce una fruta:"))
);
for (let i = 0; i < myArrayFrutas.length; i++) {
  document.write("<br>" + myArrayFrutas[i]);
}
document.write("<br>Eliminamos el ultimo: " + myArrayFrutas.pop());
for (let i = 0; i < myArrayFrutas.length; i++) {
  document.write("<br>" + myArrayFrutas[i]);
}
