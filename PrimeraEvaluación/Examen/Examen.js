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
  const fichero = text.split("&&&&&"); // Dividir el contenido en secciones

  // Procesar las secciones
  const clienteDireccion = fichero[0]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));
  clienteDireccion.shift(); //Elimino la primera fila, correspondiente a lo que seria el nombre de las columnas
  clienteDireccion.pop(); //Elimina la ultima fila, correspondiente a una fila vacia que se añadia a la sección

  const clienteTelefono = fichero[1]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));
  clienteTelefono.shift(); //Elimino la primera fila, correspondiente a lo que seria el nombre de las columnas
  clienteTelefono.pop(); //Elimina la ultima fila, correspondiente a una fila vacia que se añadia a la sección

  const clientePedido = fichero[2]
    .split("\r\n")
    .slice(1)
    .map((linea) => linea.split(";"));
  clientePedido.shift(); //Elimino la primera fila, correspondiente a lo que seria el nombre de las columnas
  clientePedido.pop(); //Elimina la ultima fila, correspondiente a una fila vacia que se añadia a la sección

  console.log(clienteDireccion);
  console.log(clienteTelefono);
  console.log(clientePedido);

  // const diferenciasDias = calcularDiferenciaDias(clientePedido);
  // console.log(diferenciasDias);
  console.log(
    listadoClientes(clienteDireccion, clienteTelefono, clientePedido)
  );
}

/*function listadoClientes(clienteDireccion, clienteTelefono, clientePedido) {
  const clientesNoOk = [];

  for (let i = 0; i < clienteDireccion.length; i++) {
    let cliente = clienteDireccion[i];

    // Separar nombre y dirección usando "–" como separador
    let partes = cliente[0].split("–"); //separo la primera columna entre nombre completo y direccion, separandolos con "–"

    let nombreCompleto = partes[0].trim(); // Eliminar espacios innecesarios
    let direccionCompleta = partes[1].trim(); // Eliminar espacios innecesarios

    // Dividir el nombre completo en nombre y apellido
    let nombrePartes = nombreCompleto.split(" ");
    let nombre = nombrePartes[0]; // Primer elemento: nombre
    let apellido = nombrePartes.slice(1).join(" "); // Resto de los elementos: apellido

    let direccionPartes = direccionCompleta.split(",");

    let calle = direccionPartes[0];
    let nCalle = direccionPartes[1];
    let poblacion = direccionPartes[2];
    let telefono = "vacío";

    for (let j = 0; j < clienteTelefono.length; j++) {
      if (clienteTelefono[0] == nombre && clienteTelefono[1] == apellido) {
        telefono = clienteTelefono[3];
      }
    }

    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Calle:", calle);
    console.log("Nº Calle:", nCalle);
    console.log("Población:", poblacion);
    console.log("Teléfono:", telefono);
  }
}*/

function listadoClientes(clienteDireccion, clienteTelefono, clientePedido) {
  const clientesNoOk = [];

  for (let i = 0; i < clienteDireccion.length; i++) {
    let cliente = clienteDireccion[i];

    // Separar nombre y dirección usando "–" como separador
    let partes = cliente[0].split("–");
    let nombreCompleto = partes[0].trim();
    let direccionCompleta = partes[1].trim();

    // Dividir el nombre completo en nombre y apellido
    let nombrePartes = nombreCompleto.split(" ");
    let nombre = nombrePartes[0];
    let apellido = nombrePartes.slice(1).join(" ");

    // Dividir dirección completa
    let direccionPartes = direccionCompleta.split(",");
    let calle = direccionPartes[0].trim();
    let nCalle = direccionPartes[1]?.trim() || "Desconocido";
    let poblacion = direccionPartes[2]?.trim() || "Desconocido";

    // Buscar teléfono
    let telefono = "vacío";
    for (let j = 0; j < clienteTelefono.length; j++) {
      if (
        clienteTelefono[j][0] === nombre &&
        clienteTelefono[j][1] === apellido
      ) {
        telefono = clienteTelefono[j][3];
        break; // Terminar la búsqueda al encontrar el teléfono
      }
    }

    // Imprimir detalles del cliente
    console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
    console.log("Calle:", calle);
    console.log("Nº Calle:", nCalle);
    console.log("Población:", poblacion);
    console.log("Teléfono:", telefono);
    console.log("--------------------------");
  }
}

// Calculo la diferencia en días desde la fecha de compra
function calcularDiferenciaDias(clientePedido) {
  const hoy = new Date(); // Fecha actual
  const resultados = [];

  for (let i = 0; i < clientePedido.length; i++) {
    let pedido = clientePedido[i];
    let nombre = pedido[0];
    let apellido = pedido[1];
    let fechaPedido = pedido[2];
    let referencia = pedido[3];

    // Verifico si la fecha de compra existe
    if (!fechaPedido) {
      continue;
    }

    // Limpio los espacios antes o después de la fecha
    fechaPedido = fechaPedido.trim();

    // Dividir la fecha en partes (día, mes, año)
    const fechaPartida = fechaPedido.split("/");

    // Verifico si la fecha tiene 3 partes (día, mes, año)
    if (fechaPartida.length !== 3) {
      continue;
    }

    // Creo la fecha en formato correcto (YYYY-MM-DD)
    const fechaFormateada = `${fechaPartida[2]}-${fechaPartida[1]}-${fechaPartida[0]}`;
    const fecha = new Date(fechaFormateada);

    // Verifico si la fecha es válida
    if (isNaN(fecha)) {
      continue;
    }

    // Calcular la diferencia en días
    const diferencia = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24)); // Un dia esta compuesto de: milisegundos * segundos * minutos * horas

    // Añado el resultado al arreglo con el formato solicitado
    resultados.push(
      `${nombre} ${apellido} / ${diferencia} días desde la compra / Código de referencia:${referencia}`
    );
  }

  return resultados;
}
