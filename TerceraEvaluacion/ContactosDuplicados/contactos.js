let contactos = [];
let contactosCompletos = [];

function Contacto(nombre, telefono) {
  this.nombre = nombre;
  this.telefono = telefono;
}

function ContactoCompleto(nombre, apellido, telefono) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
}

document
  .getElementById("importar-boton")
  .addEventListener("click", function importar() {
    const fileContactos = document.getElementById("importar-input-contactos")
      .files[0];
    const fileContactosCompletos = document.getElementById(
      "importar-input-contactos-completos"
    ).files[0];
    // Si no hay archivos seleccionados, salgo de la función
    if (!fileContactos && !fileContactosCompletos) {
      return;
    }

    // Si hay un archivo de contactos, lo leo y proceso
    if (fileContactos) {
      const readerContactos = new FileReader();
      readerContactos.onload = function (e) {
        const text = e.target.result;
        processCSV(text);
      };

      readerContactos.readAsText(fileContactos);
    } else if (fileContactosCompletos) {
      const readerContactos = new FileReader();
      readerContactos.onload = function (e) {
        const text = e.target.result;
        processCSVConEncabezado(text);
      };

      readerContactos.readAsText(fileContactosCompletos);
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input-contactos").value = "";
    document.getElementById("importar-input-contactos-completos").value = "";
  });

// Procesar CSV
function processCSV(text) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .map((lineas) => {
      // Divido el fichero por lineas
      let linea = lineas.split(";");
      return linea;
    });

  fichero.pop(); // Elimino la ultima linea vacia

  for (let celda of fichero) {
    contactos.push(new Contacto(celda[0], celda[1]));
  }
  contactos.sort((a, b) => a.nombre.localeCompare(b.nombre)); //Ordeno los contactos por nombre

  contactos = eliminaDuplicados(contactos);
  console.log("Listado de contactos sin duplicados:");
  console.table(contactos);
}

function processCSVConEncabezado(text) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((lineas) => {
      // Divido el fichero por lineas
      let linea = lineas.split(";");
      return linea;
    });

  fichero.pop(); // Elimino la ultima linea vacia

  for (let celda of fichero) {
    contactosCompletos.push(new ContactoCompleto(celda[0], celda[1], celda[2]));
  }
  contactosCompletos.sort((a, b) => a.nombre.localeCompare(b.nombre)); //Ordeno los contactos por nombre

  contactosCompletos = eliminaDuplicados(contactosCompletos);
  console.log("Listado de contactos completos sin duplicados:");
  console.table(contactosCompletos);
}

function eliminaDuplicados(array) {
  const sinDuplicados = array.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) => o.nombre === obj.nombre && o.telefono === obj.telefono
      )
  );
  return sinDuplicados;
}
