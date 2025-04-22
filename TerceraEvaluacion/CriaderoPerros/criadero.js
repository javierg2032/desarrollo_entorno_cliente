let listadoPerros = [];
let tablaPerros = [];

function Perro(
  nombre,
  padre,
  madre,
  hijos = [],
  hermanos = [],
  abueloPaterno,
  abueloMaterno,
  abuelaPaterna,
  abuelaMaterna,
  sexo
) {
  this.nombre = nombre;
  this.sexo = sexo;
  this.padre = padre;
  this.madre = madre;
  this.hijos = hijos;
  this.hermanos = hermanos;
  this.abueloPaterno = abueloPaterno;
  this.abuelaPaterna = abuelaPaterna;
  this.abueloMaterno = abueloMaterno;
  this.abuelaMaterna = abuelaMaterna;
}

document
  .getElementById("importar-boton")
  .addEventListener("click", function importar() {
    const filePerros = document.getElementById("importar-input").files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!filePerros) {
      return;
    }

    // Si hay un archivo de jugadores, lo leo y proceso
    if (filePerros) {
      const readerPerros = new FileReader();
      readerPerros.onload = function (e) {
        const text = e.target.result;
        processCSV(text);
      };

      readerPerros.readAsText(filePerros);
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input").value = "";
  });

// Procesar CSV
function processCSV(text) {
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
    tablaPerros.push(celda);
    for (i = 0; i < celda.length; i++) {
      if (celda[i]) {
        listadoPerros.push(new Perro(celda[i]));
      }
    }
  }
  listadoPerros.sort((a, b) => a.nombre.localeCompare(b.nombre)); //Ordeno los perros alfabeticamente

  listadoPerros = eliminaDuplicados();
}

function eliminaDuplicados() {
  const sinDuplicados = listadoPerros.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) => o.nombre === obj.nombre && o.apellido === obj.apellido
      )
  );
  return sinDuplicados;
}

function completaInfoPerros() {
  for (let i = 0; i < listadoPerros.length; i++) {
    asignaPadres(listadoPerros[i]);
    asignaHijos(listadoPerros[i]);
    asignaHermanos(listadoPerros[i]);
    asignaAbuelos(listadoPerros[i]);
    asignaSexo(listadoPerros[i]);
  }
  console.table(listadoPerros);
}

function asignaSexo(perro) {
  let sexo = null;
  sexo = prompt("Cual es el sexo de: " + perro.nombre).toLowerCase();
  if (sexo == "m" || sexo == "f") {
    perro.sexo = sexo;
  }
}

function asignaPadres(perro) {
  let padrePerro = null;
  let madrePerro = null;
  for (let i = 0; i < tablaPerros.length; i++) {
    for (let j = 2; j < tablaPerros[i].length; j++) {
      if (perro.nombre == tablaPerros[i][j]) {
        if (tablaPerros[i][0] != "") {
          padrePerro = tablaPerros[i][0];
        }
        if (tablaPerros[i][1] != "") {
          madrePerro = tablaPerros[i][1];
        }
        perro.padre = padrePerro;
        perro.madre = madrePerro;
        return;
      }
    }
  }
}

function asignaAbuelos(perro) {
  // Abuelos paternos
  if (perro.padre) {
    for (let i = 0; i < tablaPerros.length; i++) {
      for (let j = 2; j < tablaPerros[i].length; j++) {
        if (tablaPerros[i][j] == perro.padre) {
          if (tablaPerros[i][0] != "") {
            perro.abueloPaterno = tablaPerros[i][0];
          }
          if (tablaPerros[i][1] != "") {
            perro.abuelaPaterna = tablaPerros[i][1];
          }
          break;
        }
      }
    }
  }

  // Abuelos maternos
  if (perro.madre) {
    for (let i = 0; i < tablaPerros.length; i++) {
      for (let j = 2; j < tablaPerros[i].length; j++) {
        if (tablaPerros[i][j] == perro.madre) {
          if (tablaPerros[i][0] != "") {
            perro.abueloMaterno = tablaPerros[i][0];
          }
          if (tablaPerros[i][1] != "") {
            perro.abuelaMaterna = tablaPerros[i][1];
          }
          break;
        }
      }
    }
  }
}

function asignaHijos(perro) {
  let hijoPerro = null;
  for (let i = 0; i < tablaPerros.length; i++) {
    if (
      perro.nombre == tablaPerros[i][0] ||
      perro.nombre == tablaPerros[i][1]
    ) {
      for (let j = 2; j < tablaPerros[i].length; j++) {
        if (tablaPerros[i][j] != "") {
          hijoPerro = tablaPerros[i][j];
          perro.hijos.push(hijoPerro);
        }
      }
      return;
    }
  }
}

function asignaHermanos(perro) {
  let hermanoPerro = null;
  for (let i = 0; i < tablaPerros.length; i++) {
    if (
      perro.nombre != tablaPerros[i][0] &&
      perro.nombre != tablaPerros[i][1]
    ) {
      for (let j = 2; j < tablaPerros[i].length; j++) {
        if (perro.nombre == tablaPerros[i][j]) {
          for (let k = 2; k < tablaPerros[i].length; k++) {
            if (perro.nombre != tablaPerros[i][k] && tablaPerros[i][k] != "") {
              hermanoPerro = tablaPerros[i][k];
              perro.hermanos.push(hermanoPerro);
            }
          }
          return;
        }
      }
    }
  }
}
