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
ArticuloAsterix.prototype = new Articulo();
ArticuloCajaSorpresa.prototype = new Articulo();
ArticuloStarWars.prototype = new Articulo();

//VERIFICACIONES
function verificaSku(sku) {
  const skuValido3dig = /^[A-ZÑ]{3}[0-9]{3}$/;
  const skuValido4dig = /^[A-ZÑ]{3}[0-9]{4}$/;
  if (skuValido3dig.test(sku) || skuValido4dig.test(sku)) {
    return true;
  } else return false;
}

function verificaNombreArticulo(nombreArticulo) {
  const nombreArticuloValido = /^[a-zA-Z0-9\s\-Ññ]+$/;
  return nombreArticuloValido.test(nombreArticulo);
}

function verificaPrecioNumArticulos(numero) {
  return typeof numero === "number" && numero > 0;
}

function verificaTipoObjetoTematicaProtagonista(tipoObjeto) {
  //const formatoValido = /^[a-zA-Z0-9]?$/; // '?' hace que solo pueda coincidir si tiene 0 o 1 caracter;
  const formatoValido = /^[a-zA-Z0-9ñÑ]+$/; // '+' hace que deba coincidir una o más veces el patón (pero nunca 0);
  //Para que la Ñ sea válida se debe poner de esta forma: /^[a-zA-Z0-9ñÑ]+$/
  return formatoValido.test(tipoObjeto);
}

//IMPORTACIÓN ARCHIVOS
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
      readerStarWars.readAsText(fileStarWars);
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

// PROCESAMIENTO CSV
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

//VISTA ARTICULOS (MOSTRAR ARRAYS EN LA TABLA DE ARTICULOS)

document.addEventListener("keydown", function (evento) {
  if (evento.key == "$") {
    vistaArticulos();
  }
});

function vistaArticulos() {
  const tbody = document.querySelector("#vista-articulos-tabla tbody");
  tbody.innerHTML = ""; // Vacía la tabla

  const todosLosArticulos = [
    ...arrayArticuloAsterix.map((articulo) => ({
      tipo: "Asterix",
      ...articulo,
    })),
    ...arrayArticuloCajaSorpresa.map((articulo) => ({
      tipo: "CajaSorpresa",
      ...articulo,
    })),
    ...arrayArticuloStarWars.map((articulo) => ({
      tipo: "StarWars",
      ...articulo,
    })),
  ];

  for (let articulo of todosLosArticulos) {
    const filaTabla = document.createElement("tr");

    // Extraer campo específico
    let campoEspecifico = "";
    if (articulo.tipo === "Asterix") campoEspecifico = articulo.tipoObjeto;
    else if (articulo.tipo === "CajaSorpresa")
      campoEspecifico = articulo.tematica;
    else if (articulo.tipo === "StarWars")
      campoEspecifico = articulo.protagonista;

    const columnasTabla = [
      { valor: articulo.tipo, valido: true },
      {
        valor: campoEspecifico,
        valido: verificaTipoObjetoTematicaProtagonista(campoEspecifico),
      },
      {
        valor: articulo.nombre,
        valido: verificaNombreArticulo(articulo.nombre),
      },
      {
        valor: parseFloat(articulo.precio).toFixed(2),
        valido: verificaPrecioNumArticulos(articulo.precio),
      },
      {
        valor: articulo.numArticulos,
        valido: verificaPrecioNumArticulos(articulo.numArticulos),
      },
    ];

    for (let columna of columnasTabla) {
      const celda = document.createElement("td");
      celda.textContent = columna.valor;
      celda.style.backgroundColor = columna.valido ? "#F0E97A" : "#EF6902";
      filaTabla.appendChild(celda);
    }

    tbody.appendChild(filaTabla);
  }

  return 0;
}

//Alta nuevo articulo

document
  .getElementById("alta-articulo-boton")
  .addEventListener("click", function () {
    const boton = this;

    // Busco si ya existe el párrafo de mensaje después del botón
    let mensajeElemento = boton.nextElementSibling;
    if (!mensajeElemento || mensajeElemento.tagName.toLowerCase() !== "p") {
      // Si no existe, lo creo y lo inserto justo después del botón
      mensajeElemento = document.createElement("p");
      boton.parentNode.insertBefore(mensajeElemento, boton.nextSibling);
    }

    // Borro mensaje anterior
    mensajeElemento.textContent = "";

    let tipo = document.getElementById("alta-articulo-tipo").value;
    let especifico = document.getElementById("alta-articulo-especifico").value;
    let sku = document.getElementById("alta-articulo-sku").value;
    let nombre = document.getElementById("alta-articulo-nombre").value;
    let precio = document.getElementById("alta-articulo-precio").value;
    let numero = document.getElementById("alta-articulo-numero").value;
    let imagen = document.getElementById("alta-articulo-imagen").value;

    try {
      let resultado = altaArticulo(
        tipo,
        especifico,
        sku,
        nombre,
        precio,
        numero,
        imagen
      );

      switch (resultado) {
        case 0:
          mensajeElemento.textContent = "Alta realizada correctamente";
          // Limpio campos
          document.getElementById("alta-articulo-tipo").value = "";
          document.getElementById("alta-articulo-especifico").value = "";
          document.getElementById("alta-articulo-sku").value = "";
          document.getElementById("alta-articulo-nombre").value = "";
          document.getElementById("alta-articulo-precio").value = "";
          document.getElementById("alta-articulo-numero").value = "";
          document.getElementById("alta-articulo-imagen").value = "";
          break;
        case -1:
          mensajeElemento.textContent = "Faltan argumentos";
          break;
        case -2:
          mensajeElemento.textContent = "Argumento con formato incorrecto";
          break;
        case -3:
          mensajeElemento.textContent = "El tipo de artículo no es válido";
          break;
        default:
          mensajeElemento.textContent =
            "Error desconocido al añadir el artículo";
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      mensajeElemento.textContent =
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";
    }
  });

function altaArticulo(tipo, especifico, sku, nombre, precio, numero, imagen) {
  let tipoArticulo = tipo.trim();
  let newEspecifico = especifico.trim();
  let newSku = sku.trim();
  let newNombreArticulo = nombre.trim();
  let newPrecioStr = precio.trim();
  let newNumArticulos = parseInt(numero);
  let newImagen = imagen.trim();

  // 1. Verificar que no haya campos vacíos y que el número sea válido
  if (
    !tipoArticulo ||
    !newEspecifico ||
    !newSku ||
    !newNombreArticulo ||
    !newPrecioStr ||
    isNaN(newNumArticulos) ||
    newNumArticulos <= 0 ||
    !newImagen
  ) {
    return -1; // Faltan argumentos
  }

  // 2. Verificar formato de los datos
  const newPrecio = parseFloat(newPrecioStr);
  if (
    !verificaSku(newSku) ||
    !verificaNombreArticulo(newNombreArticulo) ||
    !verificaTipoObjetoTematicaProtagonista(tipoArticulo) ||
    !verificaTipoObjetoTematicaProtagonista(newEspecifico) ||
    isNaN(newPrecio) ||
    newPrecio <= 0
  ) {
    return -2; // Formato incorrecto
  }

  // 3. Comprobar que tipo de artículo es válido
  if (
    tipoArticulo !== "Asterix" &&
    tipoArticulo !== "CajaSorpresa" &&
    tipoArticulo !== "StarWars"
  ) {
    return -3; // Tipo artículo inválido
  }

  // 4. Comprobar si el SKU ya existe en cualquiera de los arrays
  const skuExiste =
    arrayArticuloAsterix.some((art) => art.sku === newSku) ||
    arrayArticuloCajaSorpresa.some((art) => art.sku === newSku) ||
    arrayArticuloStarWars.some((art) => art.sku === newSku);

  if (skuExiste) {
    return -2; // Rúbrica no contempla otro código, así que -2 para formato incorrecto
  }

  // 5. Añadir el artículo al array correspondiente
  if (tipoArticulo === "Asterix") {
    let nuevoArticulo = new ArticuloAsterix(newEspecifico);
    nuevoArticulo.sku = newSku;
    nuevoArticulo.nombre = newNombreArticulo;
    nuevoArticulo.precio = newPrecio;
    nuevoArticulo.numArticulos = newNumArticulos;
    nuevoArticulo.imagen = newImagen;
    arrayArticuloAsterix.push(nuevoArticulo);
  } else if (tipoArticulo === "CajaSorpresa") {
    let nuevoArticulo = new ArticuloCajaSorpresa(newEspecifico);
    nuevoArticulo.sku = newSku;
    nuevoArticulo.nombre = newNombreArticulo;
    nuevoArticulo.precio = newPrecio;
    nuevoArticulo.numArticulos = newNumArticulos;
    nuevoArticulo.imagen = newImagen;
    arrayArticuloCajaSorpresa.push(nuevoArticulo);
  } else if (tipoArticulo === "StarWars") {
    let nuevoArticulo = new ArticuloStarWars(newEspecifico);
    nuevoArticulo.sku = newSku;
    nuevoArticulo.nombre = newNombreArticulo;
    nuevoArticulo.precio = newPrecio;
    nuevoArticulo.numArticulos = newNumArticulos;
    nuevoArticulo.imagen = newImagen;
    arrayArticuloStarWars.push(nuevoArticulo);
  }

  // 6. Alta realizada correctamente
  return 0;
}

//AÑADIR UNIDADES
function anadirUnidades(sku, num) {
  const skuTrim = sku.trim();
  const unidades = parseInt(num);

  // Comprobar que unidades > 0
  if (isNaN(unidades) || unidades <= 0) {
    return -2; // Número de artículos < 0 o inválido
  }

  // Buscar el artículo en los tres arrays
  let articulo = arrayArticuloAsterix.find((art) => art.sku === skuTrim);
  if (!articulo)
    articulo = arrayArticuloCajaSorpresa.find((art) => art.sku === skuTrim);
  if (!articulo)
    articulo = arrayArticuloStarWars.find((art) => art.sku === skuTrim);

  // Si no existe el sku
  if (!articulo) {
    return -1; // No existe el SKU introducido
  }

  // Añadir unidades al numArticulos
  articulo.numArticulos += unidades;

  return 0; // Unidades añadidas correctamente
}

//MOSTRAR IMAGENES

function verImagenes(tipoArticulo) {
  return new Promise((resolve) => {
    const contenedor = document.querySelector('.contenedor-imagenes');
    contenedor.innerHTML = ''; // Limpiar imágenes previas

    let arrayArticulos;

    switch (tipoArticulo) {
      case 'Asterix':
        arrayArticulos = arrayArticuloAsterix;
        break;
      case 'CajaSorpresa':
        arrayArticulos = arrayArticuloCajaSorpresa;
        break;
      case 'StarWars':
        arrayArticulos = arrayArticuloStarWars;
        break;
      default:
        arrayArticulos = [];
    }

    // Crear promesas para cada imagen
    const promesasImagenes = arrayArticulos.map(articulo => {
      return new Promise((resolveImg) => {
        const img = document.createElement('img');
        img.src = `images/${articulo.imagen}`;
        img.width = 200;
        img.height = 200;
        img.alt = articulo.nombre;
        img.onload = () => resolveImg(img);
        img.onerror = () => resolveImg(null); // Ignorar imágenes que fallen
      });
    });

    // Cuando todas las imágenes se hayan cargado, las añadimos
    Promise.all(promesasImagenes).then(imgs => {
      imgs.forEach(img => {
        if (img) contenedor.appendChild(img);
      });
      resolve(); // Finalizado
    });
  });
}

document.getElementById('imagenes-asterix').addEventListener('mouseenter', () => {
  verImagenes('Asterix');
});

document.getElementById('imagenes-cajasorpresa').addEventListener('mouseenter', () => {
  verImagenes('CajaSorpresa');
});

document.getElementById('imagenes-starwars').addEventListener('mouseenter', () => {
  verImagenes('StarWars');
});
