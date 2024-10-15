// Página de compras donde si el usuario quiere comprar más de 4 productos, se le regala el más barato
// Mostrar un recibo donde se muestre la fecha y hora, una lista de los productos con el precio de cada uno y el total
// El precio de los productos tienen que introducirse con coma en lugar de con punto si fuese decimal
let arrayProductos = [];
let arrayPrecios = [];
let pagar = false;
let total = 0; // Declaro la variable total

do {
  let producto = prompt("¿Qué quieres añadir a la cesta?");
  let precio = prompt("¿Cuál es su precio?");

  // Cambio la coma por un punto para convertir a número
  precio = parseFloat(precio.replace(',', '.'));

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

  // Mostramos el producto regalado y restamos su precio del total
  alert(`¡Felicidades! Te regalamos el producto más barato: ${arrayProductos[arrayPrecios.indexOf(precioMin)]}`);
  total -= precioMin; // Restamos el precio más bajo al total
}

// Obtener la fecha y hora actual
let fecha = new Date();
let recibo = `Recibo de compra:\nFecha: ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}\n`;

// Genero el detalle del recibo con productos y precios
recibo += "Productos comprados:\n";
for (let i = 0; i < arrayProductos.length; i++) {
  // Mostrar precios con coma
  let precioConComa = arrayPrecios[i].toFixed(2).replace('.', ',');
  recibo += `${arrayProductos[i]} - ${precioConComa}€\n`; // Usamos comillas invertidas aquí
}

// Mostrar el total con coma
let totalConComa = total.toFixed(2).replace('.', ',');
recibo += `Total a pagar: ${totalConComa}€`; // Usamos comillas invertidas aquí

// Mostrar el recibo en el elemento con id "recibo"
document.getElementById("recibo").innerHTML = recibo.replace(/\n/g, "<br>"); // Reemplazamos saltos de línea por <br> para HTML
