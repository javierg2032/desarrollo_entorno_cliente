/*Descripción del ejercicio 
Un repartidor de paquetería que tiene que entregar cada día a domicilio distintos productos 
que han comprado los clientes a una empresa. Hay que procesar el listado de repartos para 
hoy. La información de partida se nos entrega en formato CSV. Dicho fichero incluye: 
o Listado de clientes. Cada cliente es un string en una línea con los siguientes datos: 
▪ Nombre (simple) 
▪ Apellido (un solo apellido simple) 
▪ Dirección (calle, número de la calle y población) 
o Listado de teléfonos de clientes 
▪ Nombre (el mismo que en el listado de clientes) 
▪ Apellido (el mismo que en el listado de clientes) 
▪ Número de teléfono 
o Lista de las compras a entregar realizadas por cada cliente. Tiene la siguiente 
información 
▪ Nombre 
▪ Apellido 
▪ Fecha de compra 
▪ Referencia de producto 
▪ Descripción de producto 
▪ Precio en € de la compra 
Cada uno de estos listados está separado por la secuencia de caracteres “&&&&&” dentro del 
fichero CSV. 
Diariamente, se entregan al repartidor los mismos tipos de fichero con las entregas de ese día. 
Se diferenciará por los datos de clientes y compras a entregar, pero el formato será idéntico 
cada día. El código tiene que servir no sólo para procesar el fichero de hoy en concreto, sino 
para procesar las entregas de todos los días. 
El desarrollo partirá de un fichero base .html desde el que se llamará a un script JS que será un 
fichero .js y que contendrá el código JS total de este desarrollo. 
Para procesar la información de las entregas, seguiremos los pasos que se detallan a 
continuación. 
El resultado total serán los 2 ficheros conteniendo el código completo de forma secuencial al 
seguir los pasos anteriores. 
Hay que comentar cada variable que se defina diciendo qué es o para qué se utiliza. También 
se comentará cada paso o función indicando qué hace y cómo se realiza. 
Para seguir los estándares de JS, cada variable deberá tener definido su alcance (let, var, 
const). Además, cada línea (statement) deberá terminar en “;”.*/

// Función para leer el archivo CSV seleccionado por el usuario
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Archivo seleccionado por el usuario
    const reader = new FileReader(); // Lector de archivos

    reader.onload = function (e) {
      const text = e.target.result; // Contenido del archivo
      processCSV(text); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
  });

function processCSV(text) {
  const ficheros = text.split("&&&&&"); // Dividir el contenido en secciones

  // Procesar las secciones
  const clientes = ficheros[0]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));
  const telefonos = ficheros[1]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));
  const compras = ficheros[2]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));

  console.log(clientes);
  console.log(telefonos);
  console.log(compras);

  const diferenciasDias = calcularDiferenciaDias(compras);
  console.log(diferenciasDias);
}

// Calculo la diferencia en días desde la fecha de compra
function calcularDiferenciaDias(compras) {
  const hoy = new Date(); // Fecha actual
  const resultados = [];

  for (let i = 0; i < compras.length; i++) {
    let compra = compras[i];
    let nombre = compra[0];
    let apellido = compra[1];
    let fechaCompra = compra[2];
    let referencia = compra[3];

    // Verifico si la fecha de compra existe
    if (!fechaCompra) {
      continue;
    }

    // Limpio los espacios antes o después de la fecha
    fechaCompra = fechaCompra.trim();

    // Dividir la fecha en partes (día, mes, año)
    const fechaParts = fechaCompra.split("/");

    // Verifico si la fecha tiene 3 partes (día, mes, año)
    if (fechaParts.length !== 3) {
      continue;
    }

    // Creo la fecha en formato correcto (YYYY-MM-DD)
    const fechaFormateada = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
    const fecha = new Date(fechaFormateada);

    // Verifico si la fecha es válida
    if (isNaN(fecha)) {
      continue;
    }

    // Calcular la diferencia en días
    const diferencia = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24));

    // Añado el resultado al arreglo con el formato solicitado
    resultados.push(
      `${nombre} ${apellido} / ${diferencia} días desde la compra / Código de referencia:${referencia}`
    );
  }

  return resultados;
}
