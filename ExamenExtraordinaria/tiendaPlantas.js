//Listado Plantas
const arrayPlantas = [];

//Listado Clientes
const arrayClientes = [];

//Listado Ventas
const arrayVentas = [];

//Constructor Planta
function Planta(
  idPlanta,
  nombrePlanta,
  tamanoMaceta,
  existencias,
  precio,
  plazoEntrega,
  foto
) {
  this.idPlanta = idPlanta;
  this.nombrePlanta = nombrePlanta;
  this.tamanoMaceta = tamanoMaceta;
  this.existencias = existencias;
  this.precio = precio;
  this.plazoEntrega = plazoEntrega;
  this.foto = foto;
}

//Constructor Cliente
function Cliente(idCliente, nombre, apellido, telefono, codTarjeta) {
  this.idCliente = idCliente;
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
  this.codTarjeta = codTarjeta;
}
//Constructor Venta
function Venta(
  idVenta,
  elementodVendidos,
  idPlanta,
  unidades,
  idCliente,
  fechaPedido
) {
  this.idVenta = idVenta;
  this.elementodVendidos = elementodVendidos;
  this.idPlanta = idPlanta;
  this.unidades = unidades;
  this.idCliente = idCliente;
  this.fechaPedido = fechaPedido;
}

//1 IMPORTACION DE DATOS Y CREACION DE ESTRUCTURAS DE DATOS
//IMPORTACIÓN ARCHIVOS
document
  .getElementById("importar-button")
  .addEventListener("click", function importar() {
    const filePlantas = document.getElementById("importar-input-plantas")
      .files[0];
    const fileClientes = document.getElementById("importar-input-clientes")
      .files[0];
    const fileVentas = document.getElementById("importar-input-ventas")
      .files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!filePlantas && !fileClientes && !fileVentas) {
      return;
    }
    let errorOImportacionExitosa = false;

    // Si hay un archivo de plantas, lo leo y proceso
    if (filePlantas) {
      const readerPlantas = new FileReader();
      readerPlantas.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "plantas");
      };
      readerPlantas.onerror = function () {
        errorOImportacionExitosa = true;
      };
      readerPlantas.readAsText(filePlantas);
    }

    // Si hay un archivo de clientes, lo leo y proceso
    if (fileClientes) {
      const readerClientes = new FileReader();
      readerClientes.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "clientes");
      };
      readerClientes.onerror = function () {
        errorOImportacionExitosa = true;
      };
      readerClientes.readAsText(fileClientes);
    }

    // Si hay un archivo de ventas, lo leo y proceso
    if (fileVentas) {
      const readerVentas = new FileReader();
      readerVentas.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "ventas");
      };
      readerVentas.onerror = function () {
        errorOImportacionExitosa = true;
      };
      readerVentas.readAsText(fileVentas);
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input-plantas").value = "";
    document.getElementById("importar-input-clientes").value = "";
    document.getElementById("importar-input-ventas").value = "";

    // Si no hubo error, creo y muestro el mensaje de éxito
    if (!errorOImportacionExitosa) {
      return 0;
    } else {
      return -1;
    }
  });

// PROCESAMIENTO CSV
function processCSV(text, tipoFichero) {
  console.log(text);

  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((lineas) => {
      // Divido el fichero por lineas
      let linea = lineas.split("\r\n");

      return linea.map((celda) => celda.split(";"));
    });
  console.log(fichero);

  fichero.pop(); // Elimino la ultima linea vacia

  if (tipoFichero === "plantas") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayPlantas.push(new Planta(celda[0]));
        arrayPlantas[arrayPlantas.length - 1].idPlanta = celda[0];
        arrayPlantas[arrayPlantas.length - 1].nombrePlanta = celda[1];

        arrayPlantas[arrayPlantas.length - 1].tamanoMaceta = parseInt(celda[2]);
        arrayPlantas[arrayPlantas.length - 1].existencias = parseInt(celda[3]);

        arrayPlantas[arrayPlantas.length - 1].precio = parseInt(celda[4]);
        arrayPlantas[arrayPlantas.length - 1].plazoEntrega = parseInt(celda[5]);
        arrayPlantas[arrayPlantas.length - 1].foto = celda[6];
      }
    }
    arrayPlantas.sort((a, b) => a.idPlanta - b.idPlanta); //Ordeno los articulos de asterix por el sku de mayor a menor
    console.table(arrayPlantas);
  } else if (tipoFichero === "clientes") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayClientes.push(new Cliente(celda[0]));
        arrayClientes[arrayClientes.length - 1].idCliente = celda[0];
        arrayClientes[arrayClientes.length - 1].nombre = celda[1];
        arrayClientes[arrayClientes.length - 1].apellido = celda[2];
        arrayClientes[arrayClientes.length - 1].telefono = celda[3];
        arrayClientes[arrayClientes.length - 1].codTarjeta = celda[4];
      }
    }
    arrayClientes.sort((a, b) => a.idCliente - b.idCliente);
    console.table(arrayClientes);
  } else if (tipoFichero === "ventas") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayVentas.push(new Venta(celda[0]));
        arrayVentas[arrayVentas.length - 1].idVenta = celda[0];
        arrayVentas[arrayVentas.length - 1].elementodVendidos = [
          celda[1],
          celda[2],
        ];
        arrayVentas[arrayVentas.length - 1].idPlanta = celda[1];
        arrayVentas[arrayVentas.length - 1].unidades = parseInt(celda[2]);
        arrayVentas[arrayVentas.length - 1].idCliente = celda[3];
        arrayVentas[arrayVentas.length - 1].fechaPedido = celda[4];
      }
    }
    arrayVentas.sort((a, b) => a.idVenta - b.idVenta);
    console.table(arrayVentas);
  }
}

//LISTADO CLIENTES
document
  .getElementById("listado-clientes-button")
  .addEventListener("click", function listadoClientes() {
    const tbody = document.querySelector("#listado-clientes-tabla tbody");
    tbody.innerHTML = ""; // Vacía la tabla
    let = mostradoConExito = false;
    const todosLosClientes = [
      ...arrayClientes.map((cliente) => ({
        ...cliente,
      })),
    ];

    for (let cliente of todosLosClientes) {
      const filaTabla = document.createElement("tr");
      let idValido = true;
      if (comprobarId(cliente.idCliente) == -1) {
        idValido = false;
      }
      const columnasTabla = [
        { valor: cliente.idCliente, valido: idValido },
        {
          valor: cliente.nombre,
          valido: true,
        },
        {
          valor: cliente.apellido,
          valido: true,
        },
        {
          valor: cliente.telefono,
          valido: true,
        },
        {
          valor: cliente.codTarjeta,
          valido: true,
        },
      ];

      for (let columna of columnasTabla) {
        const celda = document.createElement("td");
        celda.textContent = columna.valor;
        celda.style.backgroundColor = columna.valido ? "#7AF0CB" : "#F075D2";
        filaTabla.appendChild(celda);
      }

      tbody.appendChild(filaTabla);
      mostradoConExito = true;
    }

    if (mostradoConExito) {
      console.log("Listado de clientes completado con éxito");
      return 0;
    } else {
      console.log("Listado de clientes completado con problemas");
      return -1;
    }
  });

function comprobarId(id) {
  const idValido = /^[0-9]{5}$/;

  if (idValido.test(id)) {
    return 0;
  } else return -1;
}

//MOSTRAR DATOS DE VENTA

document
  .getElementById("mostrar-venta-button")
  .addEventListener("click", function mostrarVenta() {
    let idVentaIntroducido = document.getElementById("mostrar-venta-id").value;

    const tbody = document.querySelector("#mostrar-venta-tabla-base tbody");
    tbody.innerHTML = ""; // Vacía la tabla

    const todasLasVentas = [
      ...arrayVentas.map((venta) => ({
        ...venta,
      })),
    ];

    for (let venta of todasLasVentas) {
      if (venta.idVenta == idVentaIntroducido) {
        const filaTabla = document.createElement("tr");
        const columnasTabla = [
          { valor: venta.idCliente.cliente.nombre },
          {
            valor: venta.idCliente.cliente.apellido,
          },
          {
            valor: venta.idCliente.cliente.telefono,
          },
          {
            valor: venta.unidades,
          },
          {
            valor: Date.now(venta.fechaPedido),
          },
        ];

        for (let columna of columnasTabla) {
          const celda = document.createElement("td");
          celda.textContent = columna.valor;
          filaTabla.appendChild(celda);
        }

        tbody.appendChild(filaTabla);
      } else return 0;
    }
  });
