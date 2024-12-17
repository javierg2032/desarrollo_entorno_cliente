/*
// Función para leer el archivo CSV seleccionado por el usuario
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Archivo seleccionado por el usuario
    const reader = new FileReader(); // Lector de archivos

    reader.onload = function(e) {
        const text = e.target.result; // Contenido del archivo
        processCSV(text); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
});

// Función para procesar el contenido del archivo CSV
function processCSV(text) {
    const ficheros = text.split('&&&&&'); // Dividir el contenido en secciones

    // Procesar la sección de clientes
    const clients = ficheros[0].trim().split('\n').map(line => line.split(';'));

    // Procesar la sección de teléfonos
    const moviles = ficheros[1].trim().split('\n').map(line => line.split(';'));

    // Crear arrays para clientes completos e incompletos
    const clientesNoOk = [];
    const clientesOk = [];

    for (let i = 0; i < clients.length; i++) {
        const cliente = clients[i];
        const nombreCliente = cliente[0] || 'vacío';
        const apellidoCliente = cliente[1] || 'vacío';
        const direccionCliente = cliente[2] || 'vacío';
        const numeroCalleCliente = cliente[3] || 'vacío';
        const ciudadCliente = cliente[4] || 'vacío';

        // Buscar el teléfono del cliente
        let telefonoCliente = 'vacío';
        for (let j = 0; j < moviles.length; j++) {
            if (moviles[j][0] === nombreCliente && moviles[j][1] === apellidoCliente) {
                telefonoCliente = moviles[j][2] || 'vacío';
                break;
            }
        }

        // Verificar si algún campo está vacío
        if (nombreCliente === 'vacío' || apellidoCliente === 'vacío' || direccionCliente === 'vacío' || numeroCalleCliente === 'vacío' || ciudadCliente === 'vacío' || telefonoCliente === 'vacío') {
            clientesNoOk.push([nombreCliente, apellidoCliente, direccionCliente, numeroCalleCliente, ciudadCliente, telefonoCliente]);
        } else {
            // Usar el operador spread para agregar el cliente completo
            clientesOk.push([...cliente, telefonoCliente]);
        }
    }

    // Mostrar los resultados en la consola
    console.log('Clientes incompletos:', clientesNoOk);
    console.log('Clientes completos:', clientesOk);

    // Mostrar la información procesada en el DOM
    const output = document.getElementById('output');
    if (output) {
        let result = 'Clientes completos:\n';
        for (let i = 0; i < clientesOk.length; i++) {
            const client = clientesOk[i];
            result += `Nombre: ${client[0]}, Apellido: ${client[1]}, Calle: ${client[2]}, Número: ${client[3]}, Población: ${client[4]}, Teléfono: ${client[5]}\n`;
        }
        result += '\nClientes incompletos:\n';
        for (let i = 0; i < clientesNoOk.length; i++) {
            const client = clientesNoOk[i];
            result += `Nombre: ${client[0]}, Apellido: ${client[1]}, Calle: ${client[2]}, Número: ${client[3]}, Población: ${client[4]}, Teléfono: ${client[5]}\n`;
        }
        output.textContent = result;
    }
}*/

/*function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Evento que ocurre cuando el archivo se ha leído correctamente
    reader.onload = function (event) {
      const contenido = event.target.result; // Contenido del archivo
      const text = e.target.result; // Contenido del archivo
      processCSV(text); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
  });
}

// Función para procesar los datos del CSV
function procesarDatosCSV(datosCSV) {
  // Separar las secciones del CSV
  const secciones = datosCSV.split("&&&&&");
  const clientesRaw = secciones[0].trim().split("\r\n");
  const telefonosRaw = secciones[1].trim().split("\r\n");
  const comprasRaw = secciones[2].trim().split("\r\n");

  // Listas para clientes completos e incompletos
  const clientesNoOk = [];
  const clientesOk = [];

  // Procesar cada cliente
  for (let i = 0; i < clientesRaw.length; i++) {
    const datosCliente = clientesRaw[i].split(",").map((campo) => campo.trim());
    const nombre = datosCliente[0] || "vacío";
    const apellido = datosCliente[1] || "vacío";
    const calle = datosCliente[2] || "vacío";
    const numero = datosCliente[3] || "vacío";
    const poblacion = datosCliente[4] || "vacío";

    // Buscar el teléfono correspondiente
    let telefono = "vacío";
    for (let j = 0; j < telefonosRaw.length; j++) {
      const datosTelefono = telefonosRaw[j]
        .split(",")
        .map((campo) => campo.trim());
      if (datosTelefono[0] === nombre && datosTelefono[1] === apellido) {
        telefono = datosTelefono[2] || "vacío";
        break;
      }
    }

    // Verificar si el cliente está completo
    if (
      nombre === "vacío" ||
      apellido === "vacío" ||
      calle === "vacío" ||
      numero === "vacío" ||
      poblacion === "vacío" ||
      telefono === "vacío"
    ) {
      clientesNoOk.push([nombre, apellido, calle, numero, poblacion, telefono]);
    } else {
      clientesOk.push([nombre, apellido, calle, numero, poblacion, telefono]);
    }
  }

  // Mostrar resultados de clientes
  console.log("Clientes incompletos:", clientesNoOk);
  console.log("Clientes completos:", clientesOk);

  // Crear listado de entregas
  const entregasHoy = [];
  for (let i = 0; i < comprasRaw.length; i++) {
    const datosCompra = comprasRaw[i].split(",").map((campo) => campo.trim());
    const nombre = datosCompra[0];
    const apellido = datosCompra[1];
    const fecha = datosCompra[2];
    const referencia = datosCompra[3];
    const descripcion = datosCompra[4];
    const precio = parseFloat(datosCompra[5] || "0");

    // Buscar el cliente correspondiente
    let clienteValido = false;
    for (let j = 0; j < clientesOk.length; j++) {
      if (clientesOk[j][0] === nombre && clientesOk[j][1] === apellido) {
        entregasHoy.push([
          nombre,
          apellido,
          clientesOk[j][2], // Calle
          clientesOk[j][3], // Número
          clientesOk[j][4], // Población
          clientesOk[j][5], // Teléfono
          referencia,
          descripcion,
          fecha,
          precio.toFixed(2),
          false, // No entregable (entregable porque está completo)
        ]);
        clienteValido = true;
        break;
      }
    }

    if (!clienteValido) {
      entregasHoy.push([
        nombre || "vacío",
        apellido || "vacío",
        "vacío", // Calle
        "vacío", // Número
        "vacío", // Población
        "vacío", // Teléfono
        referencia || "vacío",
        descripcion || "vacío",
        fecha || "vacío",
        "0.00", // Precio
        true, // No entregable
      ]);
    }
  }

  // Mostrar entregas
  console.log("Entregas de hoy:", entregasHoy);

  // Crear conjunto de referencias
  const referencias = [];
  for (let i = 0; i < entregasHoy.length; i++) {
    if (!referencias.includes(entregasHoy[i][6])) {
      referencias.push(entregasHoy[i][6]);
    }
  }
  referencias.push("846425", "843555", "847415");
  console.log("Referencias de productos:", referencias);

  // Mostrar factura para el primer cliente completo
  if (clientesOk.length > 0) {
    mostrarFactura(clientesOk[0], entregasHoy);
  }
}

// Función para mostrar la factura
function mostrarFactura(cliente, entregas) {
  const entregasCliente = entregas.filter(
    (e) => e[0] === cliente[0] && e[1] === cliente[1]
  );
  let total = 0;
  let facturaHTML = `
        Nombre y apellido: ${cliente[0]} ${cliente[1]}<br>
        Dirección: ${cliente[2]}, ${cliente[3]}, ${cliente[4]}<br>
        Teléfono: ${cliente[5]}<br><br>
    `;

  for (let i = 0; i < entregasCliente.length; i++) {
    facturaHTML += `Producto: ${entregasCliente[i][7]}, Precio: €${entregasCliente[i][9]}<br>`;
    total += parseFloat(entregasCliente[i][9]);
  }

  facturaHTML += `<br>Total a pagar: €${total.toFixed(2)}`;

  document.getElementById("factura").innerHTML = facturaHTML;
}
 */

/*// Función para leer el archivo CSV seleccionado por el usuario
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

// Calcular la diferencia en días desde la fecha de compra
function calcularDiferenciaDias(compras) {
  const hoy = new Date(); // Fecha actual
  const diferencias = compras.map((compra) => {
    const fechaCompra = new Date(compra[2]);
    const diferencia = Math.floor((hoy - fechaCompra) / (1000 * 60 * 60 * 24)); // Diferencia en días
    return diferencia;
  });
  return diferencias;
}
 */

/*// Calcular la diferencia en días desde la fecha de compra
function calcularDiferenciaDias(compras) {
  const hoy = new Date(); // Fecha actual
  const diferencias = compras.map((compra) => {
    // Comprobar si la fecha de compra existe y tiene un valor válido
    let fechaCompra = compra[2] ? compra[2].trim() : null; // Eliminar espacios antes o después de la fecha

    if (!fechaCompra) {
      return "No hay fecha";
    }

    const fechaParts = fechaCompra.split("/");
    if (fechaParts.length === 3) {
      // Cambiar el formato de la fecha
      fechaCompra = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
    }

    const fecha = new Date(fechaCompra);
    if (isNaN(fecha)) {
      return "Fecha no valida"; 
    }

    const diferencia = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24)); // Diferencia en días
    return diferencia;
  });
  return diferencias;
} */

/*
  function listadoClientes(clienteDireccion, clienteTelefono, clientePedido) {
  const clientesNoOk = [nombre, apellido, calle, nCalle, poblacion, telefono];

//para ello debo recorrer el primer listado por filas, y por cada fila debo buscar el nombre 
// (digamos que es como un identificador) en los otros listados, para añadir la informacion requerida en clientesNoOk
// Crear un array llamado clientesNoOk con el listado de clientes que contienen algún campo vacío, con los campos que se detallan a continuación. En cada campo vacío, se 
// pondrá el string “vacío”. Se utilizará obligatoriamente de alguna manera el operador ?? ó el operador ||. 
// Nombre, Apellido, Calle, Número de calle, Población, Teléfono 

}
  */
