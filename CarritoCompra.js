let arrayProductos = [];
let arrayPrecios = [];
let pagar = false;
let total = 0;
let dniValido = false;
let nombre = prompt("¿Cuál es tu nombre?");
let dni;

do {
  dni = prompt("¿Cuál es tu DNI?");
  if (dni.length == 9) {
    let letraDni = dni.charAt(dni.length - 1).toUpperCase(); // Convertimos a mayúscula
    let numeros = dni.slice(0, -1);
    let numero = parseInt(numeros, 10);
    const letras = "TRWAGMYFPDXBNJZSQVHLCKET";
    let letraCalculada = letras[numero % 23];
    if (letraDni === letraCalculada) {
      dniValido = true;
      alert("DNI válido. Bienvenido, " + nombre + "!");
    } else {
      alert("La letra del DNI es incorrecta. Inténtalo de nuevo.");
    }
  } else {
    alert("Formato de DNI incorrecto. Debe tener 8 dígitos y una letra final. Inténtalo de nuevo.");
  }
} while (!dniValido);

do {
  let producto = prompt("¿Qué quieres añadir a la cesta?");
  let precio = prompt("¿Cuál es su precio?");

  // Cambio la coma por un punto para convertir a número
  precio = parseFloat(precio.replace(",", "."));

  arrayProductos.unshift(producto);
  arrayPrecios.unshift(precio);

  let pago = prompt("¿Quieres proceder ya al pago? (Si/No)");
  if (pago.toLowerCase() === "si") {
    pagar = true;
  }
} while (!pagar);

// Calcular el total sumando los precios
for (let i = 0; i < arrayPrecios.length; i++) {
  total += arrayPrecios[i]; // Sumamos cada precio al total
}

// Si hay más de 4 productos, regalamos el más barato
if (arrayPrecios.length > 4) {
  let precioMin = arrayPrecios[0]; // Suponemos que el primero es el más barato

  // Buscamos el precio más bajo
  for (let i = 1; i < arrayPrecios.length; i++) {
    if (arrayPrecios[i] < precioMin) {
      precioMin = arrayPrecios[i]; // Actualizamos si encontramos uno más barato
    }
  }

  alert(
    `¡Felicidades! Te regalamos el producto más barato: ${
      arrayProductos[arrayPrecios.indexOf(precioMin)]
    }`
  );
  total -= precioMin;
}

// Obtener la fecha y hora actual
let fecha = new Date();
let recibo = `Recibo de compra:\nFecha: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}\n`;

// Agregar el nombre y el DNI del cliente al recibo
recibo += `Cliente: ${nombre}\nDNI: ${dni}\n\n`;

// Genero el detalle del recibo con productos y precios
recibo += "Productos comprados:\n";
for (let i = 0; i < arrayProductos.length; i++) {
  // Mostrar precios con coma
  let precioConComa = arrayPrecios[i].toFixed(2).replace(".", ",");
  recibo += `${arrayProductos[i]} - ${precioConComa}€\n`;
}

// Mostrar el total con coma
let totalConComa = total.toFixed(2).replace(".", ",");
recibo += `Total a pagar: ${totalConComa}€`;

// Mostrar el recibo
document.getElementById("recibo").innerHTML = recibo.replace(/\n/g, "<br>");