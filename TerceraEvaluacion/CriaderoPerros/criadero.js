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
  completaInfoPerros();
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
  /*let sexo = null;
  sexo = prompt("Cual es el sexo de: " + perro.nombre).toLowerCase();
  if (sexo == "m" || sexo == "f") {
    perro.sexo = sexo;
  }*/
  num = Math.floor(Math.random() * 2);
  if (num == 0) {
    perro.sexo = "m";
  } else {
    perro.sexo = "f";
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

function preguntaFamilia(nombre) {
  let nombrePerro = nombre.toLowerCase();
  for (let i = 0; i < listadoPerros.length; i++) {
    if (listadoPerros[i].nombre.toLowerCase() == nombrePerro) {
      console.log(listadoPerros[i]);
      break;
    }
  }
}

function cruzaPerros() {
  let numeroCruces = Math.floor(Math.random() * 8) + 1;
  let listadoCruces = [];
  let perro1 = null;
  let perro2 = null;

  console.log("El numero de cruces a realizar es: " + numeroCruces);

  for (let i = 0; i < numeroCruces; i++) {
    let disponible1 = false;
    let disponible2 = false;

    do {
      disponible1 = true;
      perro1 = Math.floor(Math.random() * listadoPerros.length);
      for (let j = 0; j < listadoCruces.length; j++) {
        if (
          listadoCruces[j].nombre1 === listadoPerros[perro1].nombre ||
          listadoCruces[j].nombre2 === listadoPerros[perro1].nombre
        ) {
          disponible1 = false;
          break;
        }
      }
    } while (!disponible1);

    do {
      disponible2 = true;
      perro2 = Math.floor(Math.random() * listadoPerros.length);
      for (let j = 0; j < listadoCruces.length; j++) {
        if (
          listadoCruces[j].nombre1 === listadoPerros[perro2].nombre ||
          listadoCruces[j].nombre2 === listadoPerros[perro2].nombre
        ) {
          disponible2 = false;
          break;
        }
      }
    } while (!disponible2);

    if (validaSexos(listadoPerros[perro1], listadoPerros[perro2])) {
      if (listadoPerros[perro1].sexo === "m") {
        listadoCruces.push({
          padre: listadoPerros[perro1].nombre,
          madre: listadoPerros[perro2].nombre,
          cachorros: [],
        });
      } else {
        if (listadoPerros[perro1].sexo === "f") {
          listadoCruces.push({
            padre: listadoPerros[perro2].nombre,
            madre: listadoPerros[perro1].nombre,
            cachorros: [],
          });
        }
      }
    } else {
      i--;
    }
  }

  listadoCruces.forEach((cruce, index) => {
    let cachorros = generaCachorros(cruce.padre, cruce.madre);
    listadoCruces[index].cachorros = cachorros;
  });

  console.log("Cruces realizados: " + listadoCruces.length);

  return listadoCruces;
}

function validaSexos(perro1, perro2) {
  if (perro1.sexo != perro2.sexo) {
    return true;
  } else return false;
}

function generaCachorros(padre, madre) {
  let numeroCachorros = Math.floor(Math.random() * 5) + 1;
  let listadoCachorros = [];
  let sexo = "m";
  for (let i = 0; i < numeroCachorros; i++) {
    let num = Math.floor(Math.random() * 2);
    if (num != 0) {
      sexo = "f";
    }

    listadoCachorros.push(
      new Perro({
        nombre: i,
        padre: padre,
        madre: madre,
        sexo: sexo,
      })
    );
  }
  return listadoCachorros;
}
