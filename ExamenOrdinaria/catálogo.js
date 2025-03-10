//Listado ArticuloAsterix
const arrayArticuloAsterix = [];

//Listado ArticuloCajaSorpresa
const arrayArticuloCajaSorpresa = [];

//Listado ArticuloStarWars
const arrayArticuloStarWars = [];

//Constructor Articulo
function Articulo(sku, nombreArticulo, precio, numArticulos, imagen) {
  this.sku = sku;
  this.nombreArticulo = nombreArticulo;
  this.precio = precio;
  this.numArticulos = numArticulos;
  this.imagen = imagen;
}

//Constructor ArticuloAsterix
function ArticuloAsterix(tipoObjeto) {
  this.tipoObjeto = tipoObjeto;
}

//Constructor ArticuloAsterix
function ArticuloCajaSorpresa(tematica) {
  this.tematica = tematica;
}

//Constructor ArticuloAsterix
function ArticuloStarWars(protagonista) {
  this.protagonista = protagonista;
}

// Prototipados
ArticuloAsterix.prototype = Articulo;
ArticuloCajaSorpresa.prototype = Articulo;
ArticuloStarWars.prototype = Articulo;

//VERIFICACIONES
function verificaSku(sku) {
  const skuValido3dig = /^[A-Z^Ñ]{3}[0-9]{3}?$/;
  const skuValido4dig = /^[A-Z^Ñ]{3}[0-9]{4}?$/;
  if (skuValido3dig.test(sku) || skuValido4dig.test(sku)) {
    return true;
  } else return false;
}

function verificaNombreArticulo(nombreArticulo) {
  const nombreArticuloValido = /^[a-zA-Z0-9\s\-^Ñ]+$/;
  return nombreArticuloValido.test(nombreArticulo);
}

function verificaPrecioNumArticulos(numero) {
  if (typeof numero === "number") {
    if (numero > 0) {
      return true;
    } else {
      return false;
    }
  }
}

function verificaTipoObjetoTematicaProtagonista(tipoObjeto) {
  const formatoValido = /^[a-zA-Z0-9^Ñ]?$/;
  return formatoValido.test(tipoObjeto);
}

document
  .getElementById("importar-boton")
  .addEventListener("click", function importar() {
    let seccionImportar = document.getElementById("importar");
    let mensajeExistente = document.getElementById("mensaje-importacion");

    // Si el mensaje ya existe, lo elimino antes de importar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    const fileAsterix = document.getElementById("importar-input-asterix")
      .files[0];
    const fileCajaSorpresa = document.getElementById(
      "importar-input-cajasorpresa"
    ).files[0];
    const fileStarWars = document.getElementById("importar-input-starwars")
      .files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!fileAsterix && !fileCajaSorpresa && !fileStarWars) {
      return;
    }

    let errorOImportacionExitosa = false;

    // Si hay un archivo de astix, lo leo y proceso
    if (fileAsterix) {
      const readerAsterix = new FileReader();
      readerAsterix.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "asterix");
      };
      readerAsterix.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de asterix.");
      };
      readerAsterix.readAsText(fileAsterix);
    }

    // Si hay un archivo de cajaSorpresa, lo leo y proceso
    if (fileCajaSorpresa) {
      const readerCajaSorpresa = new FileReader();
      readerCajaSorpresa.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "cajaSorpresa");
      };
      readerCajaSorpresa.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de cajaSorpresa.");
      };
      readerCajaSorpresa.readAsText(fileCajaSorpresa);
    }

    // Si hay un archivo de starWars, lo leo y proceso
    if (fileStarWars) {
      const readerStarWars = new FileReader();
      readerStarWars.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "starWars");
      };
      readerStarWars.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de starWars.");
      };
      readerStarWars.readAsText(fileCajaSorpresa);
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input-asterix").value = "";
    document.getElementById("importar-input-cajasorpresa").value = "";
    document.getElementById("importar-input-starwars").value = "";

    // Si no hubo error, creo y muestro el mensaje de éxito
    if (!errorOImportacionExitosa) {
      /*mostrarMensajeExito("¡Importación Exitosa!");*/
      return 0;
    } else {
      return -1;
    }

    /*
    // Función para mostrar el mensaje de error
    function mostrarMensajeError(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-importacion";
      p.innerText = mensaje;
      p.style.color = "red";
      seccionImportar.appendChild(p);
    }

    // Función para mostrar el mensaje de éxito
    function mostrarMensajeExito(mensaje) {
      let p = document.createElement("p");
      p.id = "mensaje-importacion";
      p.innerText = mensaje;
      p.style.color = "green";
      seccionImportar.appendChild(p);
    }*/
  });

// Procesar CSV
function processCSV(text, tipoFichero) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((lineas) => {
      // Divido el fichero por lineas
      let linea = lineas.split(";");

      return linea.map((celda) => celda.split(":"));
      /*
      // Divido las lineas en celdas y convierto en array las filas
      return linea.map((celda) => celda.split(":")).flat();*/
    });

  fichero.pop(); // Elimino la ultima linea vacia

  if (tipoFichero === "asterix") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayArticuloAsterix.push(new ArticuloAsterix(celda[0]));
        arrayArticuloAsterix[arrayArticuloAsterix.length - 1].sku = celda[1];
        arrayArticuloAsterix[arrayArticuloAsterix.length - 1].nombre = celda[2];

        arrayArticuloAsterix[arrayArticuloAsterix.length - 1].precio = parseInt(
          celda[3]
        );
        arrayArticuloAsterix[arrayArticuloAsterix.length - 1].numArticulos =
          parseInt(celda[4]);
        arrayArticuloAsterix[arrayArticuloAsterix.length - 1].imagen = celda[5];
      }
    }

    arrayArticuloAsterix.sort((a, b) => a.sku - b.sku); //Ordeno los articulos de asterix por el sku de mayor a menor
    console.table(arrayArticuloAsterix);
  } else if (tipoFichero === "cajaSorpresa") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayArticuloCajaSorpresa.push(new ArticuloCajaSorpresa(celda[0]));
        arrayArticuloCajaSorpresa[arrayArticuloCajaSorpresa.length - 1].sku =
          celda[1];
        arrayArticuloCajaSorpresa[arrayArticuloCajaSorpresa.length - 1].nombre =
          celda[2];
        arrayArticuloCajaSorpresa[arrayArticuloCajaSorpresa.length - 1].precio =
          parseInt(celda[3]);
        arrayArticuloCajaSorpresa[
          arrayArticuloCajaSorpresa.length - 1
        ].numArticulos = parseInt(celda[4]);
        arrayArticuloCajaSorpresa[arrayArticuloCajaSorpresa.length - 1].imagen =
          celda[5];
      }
    }

    arrayArticuloCajaSorpresa.sort((a, b) => a.sku - b.sku);
    console.table(arrayArticuloCajaSorpresa);
  } else if (tipoFichero === "starWars") {
    for (let fila of fichero) {
      for (let celda of fila) {
        arrayArticuloStarWars.push(new ArticuloStarWars(celda[0]));
        arrayArticuloStarWars[arrayArticuloStarWars.length - 1].sku = celda[1];
        arrayArticuloStarWars[arrayArticuloStarWars.length - 1].nombre =
          celda[2];
        arrayArticuloStarWars[arrayArticuloStarWars.length - 1].precio =
          parseInt(celda[3]);
        arrayArticuloStarWars[arrayArticuloStarWars.length - 1].numArticulos =
          parseInt(celda[4]);
        arrayArticuloStarWars[arrayArticuloStarWars.length - 1].imagen =
          celda[5];
      }
    }

    arrayArticuloStarWars.sort((a, b) => a.sku - b.sku);
    console.table(arrayArticuloStarWars);
  }
}

//Alta nuevo articulo

document
  .getElementById("alta-articulo-boton")
  .addEventListener("click", function () {
 


    let tipo = document.getElementById("alta-articulo-tipo").value;
    let especifico = document.getElementById("alta-articulo-especifico").value;
    let sku = document.getElementById("alta-articulo-sku").value;
    let nombre = document.getElementById("alta-articulo-nombre").value;
    let precio = document.getElementById("alta-articulo-precio").value;
    let numero = document.getElementById("alta-articulo-numero").value;
    let imagen = document.getElementById("alta-articulo-imagen").value;

    try {
      altaArticulo(tipo, especifico, sku, nombre, precio, numero, imagen);
   
      // Limpio los campos del formulario
      document.getElementById("alta-articulo-tipo").value = "";
      document.getElementById("alta-articulo-especifico").value = "";
      document.getElementById("alta-articulo-sku").value = "";
      document.getElementById("alta-articulo-nombre").value = "";
      document.getElementById("alta-articulo-precio").value = "";
      document.getElementById("alta-articulo-numero").value = "";
      document.getElementById("alta-articulo-imagen").value = "";
    } catch (error) {
      
    }
  });

function altaArticulo(tipo, especifico, sku, nombre, precio, numero, imagen) {
  let tipoArticulo = tipo;
  let newEspecifico = especifico;
  let newSku = sku;
  let newNombreArticulo = nombre;
  let newPrecio = precio;
  let newNumArticulos = parseInt(numero);
  let newImagen = imagen;

  // Verifico que ninguno de los datos esté vacío
  if (
    tipoArticulo != "" &&
    newEspecifico != "" &&
    newSku != "" &&
    newNombreArticulo != "" &&
    newPrecio != "" &&
    newNumArticulos != "" &&
    newImagen != ""
  ) {
    // Verifico el formato de cada dato
    if (
      verificaSku(newSku) &&
      verificaNombreArticulo(newNombreArticulo) &&
      verificaPrecioNumArticulos(newPrecio) &&
      verificaPrecioNumArticulos(newNumArticulos) &&
      verificaTipoObjetoTematicaProtagonista(tipoArticulo)
    ) {
      if (tipoArticulo === "Asterix") {
        let existe = arrayArticuloAsterix.some(
          (articulo) => articulo.sku === sku
        ); // Uso some() para verificar si ya hay un articulo con el mismo sku

        if (!existe) {
          if (!existe) {
            arrayArticuloAsterix.push(new ArticuloAsterix(newEspecifico));
            arrayArticuloAsterix[arrayArticuloAsterix.length - 1].sku = newSku;
            arrayArticuloAsterix[arrayArticuloAsterix.length - 1].nombre =
              newNombreArticulo;

            arrayArticuloAsterix[arrayArticuloAsterix.length - 1].precio =
              parseInt(newPrecio);
            arrayArticuloAsterix[arrayArticuloAsterix.length - 1].numArticulos =
              parseInt(newNumArticulos);
            arrayArticuloAsterix[arrayArticuloAsterix.length - 1].imagen =
              newImagen;
            return 0;
          }
        } else {
          if (tipoArticulo === "CajaSorpresa") {
            let existe = arrayArticuloCajaSorpresa.some(
              (articulo) => articulo.sku === sku
            ); // Uso some() para verificar si ya hay un articulo con el mismo sku

            if (!existe) {
              arrayArticuloCajaSorpresa.push(
                new ArticuloCajaSorpresa(newEspecifico)
              );
              arrayArticuloCajaSorpresa[
                arrayArticuloCajaSorpresa.length - 1
              ].sku = newSku;
              arrayArticuloCajaSorpresa[
                arrayArticuloCajaSorpresa.length - 1
              ].nombre = newNombreArticulo;

              arrayArticuloCajaSorpresa[
                arrayArticuloCajaSorpresa.length - 1
              ].precio = parseInt(newPrecio);
              arrayArticuloCajaSorpresa[
                arrayArticuloCajaSorpresa.length - 1
              ].numArticulos = parseInt(newNumArticulos);
              arrayArticuloCajaSorpresa[
                arrayArticuloCajaSorpresa.length - 1
              ].imagen = newImagen;
              return 0;
            }
          } else {
            if (tipoArticulo === "StarWars") {
              let existe = arrayArticuloStarWars.some(
                (articulo) => articulo.sku === sku
              ); // Uso some() para verificar si ya hay un articulo con el mismo sku

              if (!existe) {
                arrayArticuloStarWars.push(new ArticuloStarWars(newEspecifico));
                arrayArticuloStarWars[arrayArticuloStarWars.length - 1].sku =
                  newSku;
                arrayArticuloStarWars[arrayArticuloStarWars.length - 1].nombre =
                  newNombreArticulo;

                arrayArticuloStarWars[arrayArticuloStarWars.length - 1].precio =
                  parseInt(newPrecio);
                arrayArticuloStarWars[
                  arrayArticuloStarWars.length - 1
                ].numArticulos = parseInt(newNumArticulos);
                arrayArticuloStarWars[arrayArticuloStarWars.length - 1].imagen =
                  newImagen;
                return 0;
              }
            } else {
              return -3;
            }
          }
        }
      } else {
        return -2; // Muestro un mensaje de error si algún dato tiene un formato inválido
      }
    } else {
      return -1;
    }
  }
}
