//Comprobar si los días introducidos coinciden con el dia de hoy (cumpleaños)
console.log("<br>" + (hoy = new Date()));
let diasIntroducidos = prompt("Introduce los días:");
let myArrayDias = diasIntroducidos.split(",");
myArrayDias.sort(function (a, b) {
  return a - b;
});
for (let i = 0; i < myArrayDias.length; i++) {
  if (myArrayDias[i] == hoy.getDate()) {
    console.log(
      "<br>" + ("El día, " + myArrayDias[i] + " coincide con el dia de hoy")
    );
  } else
    console.log(
      "<br>" + ("El día, " + myArrayDias[i] + " no coincide con el dia de hoy")
    );
}