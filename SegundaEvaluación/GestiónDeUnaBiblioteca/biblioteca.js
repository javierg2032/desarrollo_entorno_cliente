// Recibir Fichero de Libros

/*document
  .getElementById("importar-boton")
  .addEventListener("click", function () {
    if (
      document.getElementById("importar-input-libros").value == "" &&
      document.getElementById("importar-input-lectores").value == ""
    ) {
      p.remove();
    }

    const fileLibros = document.getElementById("importar-input-libros")
      .files[0];
    const fileLectores = document.getElementById("importar-input-lectores")
      .files[0];

    if (fileLibros) {
      const readerLibros = new FileReader();
      readerLibros.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "libros");
      };
      readerLibros.readAsText(fileLibros);
    }

    if (fileLectores) {
      const readerLectores = new FileReader();
      readerLectores.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "lectores");
      };
      readerLectores.readAsText(fileLectores);
    }

    //Si se ha importado de forma correcta, añadir un parrafo que indique "Importacion Exitosa"
    let seccionImportar = document.getElementById("importar");
    let p = document.createElement("p");
    p.innerText = "Importacion Exitosa!";
    seccionImportar.appendChild(p);

    //Cuando se importan los ficheros, se limpian los campos de importación
    document.getElementById("importar-input-libros").value = "";
    document.getElementById("importar-input-lectores").value = "";
  });*/

document
  .getElementById("importar-boton")
  .addEventListener("click", function () {
    let seccionImportar = document.getElementById("importar");
    let mensajeExistente = document.getElementById("mensaje-importacion");

    // Si el mensaje ya existe, lo elimino antes de importar
    if (mensajeExistente) {
      mensajeExistente.remove();
    }

    const fileLibros = document.getElementById("importar-input-libros")
      .files[0];
    const fileLectores = document.getElementById("importar-input-lectores")
      .files[0];

    // Si no hay archivos seleccionados, salgo de la función
    if (!fileLibros && !fileLectores) {
      return;
    }

    let errorOImportacionExitosa = false;

    // Si hay un archivo de libros, lo leo y proceso
    if (fileLibros) {
      const readerLibros = new FileReader();
      readerLibros.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "libros");
      };
      readerLibros.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de libros.");
      };
      readerLibros.readAsText(fileLibros);
    }

    // Si hay un archivo de lectores, lo leo y proceso
    if (fileLectores) {
      const readerLectores = new FileReader();
      readerLectores.onload = function (e) {
        const text = e.target.result;
        processCSV(text, "lectores");
      };
      readerLectores.onerror = function () {
        errorOImportacionExitosa = true;
        mostrarMensajeError("Error al leer el archivo de lectores.");
      };
      readerLectores.readAsText(fileLectores);
    }

    // Si no hubo error, creo y muestro el mensaje de éxito
    if (!errorOImportacionExitosa) {
      mostrarMensajeExito("¡Importación Exitosa!");
    }

    // Limpio los campos de importación después de importar
    document.getElementById("importar-input-libros").value = "";
    document.getElementById("importar-input-lectores").value = "";

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
    }
  });

// Procesar CSV
function processCSV(text, tipoFichero) {
  const fichero = text
    .split("\r\n") // Divido en líneas
    .slice(1) // Elimino la primera línea (encabezado)
    .map((linea) => {
      // Divido el fichero por lineas
      let celdas = linea.split(";");

      // Divido las lineas en celdas y convierto en array las filas
      return celdas.map((celda) => celda.split(",")).flat();
    });

  fichero.pop(); // Elimino la ultima linea vacia

  if (tipoFichero === "lectores") {
    for (let celda of fichero) {
      listaLectores.push(
        new Lector(celda[0], celda[1], celda[2], celda[3], celda[4])
      );
    }

    listaLectores.sort((a, b) => a.numSocio - b.numSocio); //Ordeno los lectores por el numero de socio de mayor a menor
    console.log(listaLectores);

    //Compruebo los emails y los telefonos de los lectores
    comprobarEmails(verificarEmail);
    comprobarTelefonos(verificarTelefono);

    if (listaCorreosInvalidos.length > 0) {
      console.log(listaCorreosInvalidos);
    }
    if (listaTelefonosInvalidos.length > 0) {
      console.log(listaTelefonosInvalidos);
    }
  } else if (tipoFichero === "libros") {
    for (let celda of fichero) {
      listaLibros.push(
        new Libro(celda[0], celda[1], celda[2], celda[3], celda[4], celda[5])
      );
    }
    listaLibros.sort((a, b) => a.codLibro - b.codLibro); //Ordeno los libros por el codigo de libro de mayor a menor

    console.log(listaLibros);
  }
}

//Constructor Lector
function Lector(numSocio, nombre, apellido, telefono, email) {
  this.numSocio = numSocio;
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
  this.email = email;
}

//Constructor Libro
function Libro(codLibro, isbn, autor, titulo, editorial, ejemplares) {
  this.codLibro = codLibro;
  this.isbn = isbn;
  this.autor = autor;
  this.titulo = titulo;
  this.editorial = editorial;
  this.ejemplares = ejemplares;
}

//Constructor Prestamo
function Prestamo(numPrestamo, numSocio, codLibro) {
  this.numPrestamo = numPrestamo;
  this.numSocio = numSocio;
  this.codLibro = codLibro;
  this.fechaPrestamo = new Date();
}

//Listado Lectores
const listaLectores = [];

//Listado Libros
const listaLibros = [];

//Listado Correos Invalidos
const listaCorreosInvalidos = [];

//Listado Telefonos Invalidos
const listaTelefonosInvalidos = [];

//Listado Dominios Validos
const listaDominiosValidos = ["es", "com", "org", "net", "eu"];

//Listado Prestamos Total
const listadoTotalPrestamos = [];

//Listado Prestamos Vivos
const listadoPrestamosVivos = [];

//Funciones de Lector
function altaLector() {
  /*La función devolverá:
    numSocio – Si el alta ha sido correcta
    F – Si falta algún dato
    V – Si hay algún dato con formato incorrecto*/
  //numSocio debe generarse automaticamente sin repetirse con algun numSocio existente
  let resultado = "F"; //Inicializo el resultado a F
  let numSocio =
    parseInt(listaLectores[listaLectores.length - 1].numSocio) +
    1; /*Convierto el numero de socio del ultimo indice del array en un entero 
  para porder sumarle 1 de forma que el numero de socio sea el siguiente al ultimo*/
  let nombre = prompt("Introduce el nombre:");
  let apellido = prompt("Introduce el apellido:");
  let telefono = prompt("Introduce el teléfono:");
  let email = prompt("Introduce el email:");
  numSocio =
    numSocio.toString(); /*Convierto de nuevo el numero de socio en una cadena de texto para que cumpla con los requisitos del enunciado*/

  if (nombre != "" && apellido != "" && telefono != "" && email != "") {
    if (
      verificarEmail(email) &&
      verificarTelefono(telefono) &&
      verificarNombreApellidoAutorEditorial(nombre) &&
      verificarNombreApellidoAutorEditorial(apellido)
    ) {
      listaLectores.push(
        new Lector(numSocio, nombre, apellido, telefono, email)
      );
      console.log("Lector añadido correctamente");
      resultado = numSocio;
      console.log(listaLectores);
    } else {
      console.log(
        "No se ha podido añadir el lector debido a que el email o el teléfono no son válidos"
      );
      resultado = "V";
    }
  }
  return resultado;
}

function bajaLector(numeroSocio) {
  let numeroSocioString = numeroSocio.toString();
  let estadoBaja = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocioString) {
      listaLectores[lector].bajaLector = true;
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, "0"); //padStart indica la longitud que debe tener y en caso de ser menor, añade un 0 a la izquierda
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); //en javascript los meses empiezan en 0, por eso le sumo 1
      const anyo = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anyo}`;
      listaLectores[lector].fechaBaja = fechaFormateada;
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    alert("Lector dado de baja correctamente");
    console.table(listaLectores);
  } else {
    alert("El número de socio introducido no coincide con el de ningún lector");
  }
}

function modifLector(numeroSocio) {
  // Compruebo si el numSocio existe en la lista de lectores
  let existeSocio = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocio) {
      existeSocio = true; // Si existe, marco la bandera
      break;
    }
  }

  if (!existeSocio) {
    alert("El número de socio no existe.");
    return; // Salgo de la función si no existe el numSocio
  }

  let datoAModificar = prompt("Introduce el dato a modificar");

  switch (datoAModificar) {
    case "numSocio":
      let numSocio = prompt("Introduce el nuevo numSocio:");

      // Compruebo si el numSocio ya existe
      let existe = false;
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numSocio) {
          existe = true; // Si ya existe, marco la bandera
          break;
        }
      }

      if (existe) {
        alert("El número de socio ya existe");
      } else {
        // Si no existe, cambio el numSocio del lector correspondiente
        for (let lector in listaLectores) {
          if (listaLectores[lector].numSocio == numeroSocio) {
            listaLectores[lector].numSocio = numSocio;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      }
      break;

    case "nombre":
      let nombre = prompt("Introduce el nuevo nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarNombreApellidoAutorEditorial(nombre)) {
            listaLectores[lector].nombre = nombre;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del nombre no es valido");
            break;
          }
        }
      }
      break;

    case "apellido":
      let apellido = prompt("Introduce el nuevo apellido:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarNombreApellidoAutorEditorial(apellido)) {
            listaLectores[lector].apellido = apellido;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del apellido no es valido");
            break;
          }
        }
      }
      break;

    case "telefono":
      let telefono = prompt("Introduce el nuevo teléfono:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarTelefono(telefono)) {
            listaLectores[lector].telefono = telefono;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del telefono no es valido");
            break;
          }
        }
      }
      break;

    case "email":
      let email = prompt("Introduce el nuevo email:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          if (verificarEmail(email)) {
            listaLectores[lector].email = email;
            alert("Lector modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          } else {
            alert("El formato del email no es valido");
            break;
          }
        }
      }
      break;

    default:
      alert("Dato no válido.");
      return;
  }

  listaLectores.sort((a, b) => a.numSocio - b.numSocio);
}

//COMPROBACIONES LECTOR

// Función para comprobar el email
//Implemento un Callback siguiendo la teoria vista en clase
function comprobarEmails(verificarEmail) {
  /*Compruebo si el lector existe para añadirlo a la lista de email invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
    no lo añado a la lista de no validos (debido a que si algun campo a la hora de dar de alta un cliente es erroneo, no deberia poder crearse)*/
  for (let lector in listaLectores) {
    if (!verificarEmail(listaLectores[lector].email)) {
      listaCorreosInvalidos.push({
        numSocio: listaLectores[lector].numSocio, //Creo una propiedad en un objeto con una clave específica y le asigno el valor del Lector correspondiente
        nombre: listaLectores[lector].nombre,
        apellido: listaLectores[lector].apellido,
        telefono: listaLectores[lector].telefono,
        email: listaLectores[lector].email,
      });
    }
  }
}

// Función para comprobar el teléfono
function comprobarTelefonos(verificarTelefono) {
  /*Compruebo si el lector existe para añadirlo a la lista de telefonos invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
   no lo añado a la lista de no validos (debido a que si algun campo a la hora de dar de alta un cliente es erroneo, no deberia poder crearse)*/
  for (let lector in listaLectores) {
    if (!verificarTelefono(listaLectores[lector].telefono)) {
      listaTelefonosInvalidos.push({
        numSocio: listaLectores[lector].numSocio,
        nombre: listaLectores[lector].nombre,
        apellido: listaLectores[lector].apellido,
        telefono: listaLectores[lector].telefono,
        email: listaLectores[lector].email,
      });
    }
  }
}

//VERIFICACIONES LECTOR

function verificarEmail(direccionEmail) {
  const dominios = listaDominiosValidos.join("|"); /*es|com|org|net|eu*/
  const emailValido = new RegExp(
    `^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.(${dominios}))+$`
  );

  if (!emailValido.test(direccionEmail)) {
    /*En caso de que emailValido sea false (no coinciden los requisitos de emailLector con la expresion regular de emailValido)*/
    return false;
  } else {
    return true;
  }
}

function verificarTelefono(numeroTelefono) {
  const telefonoValido = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos despues del primero
  if (!telefonoValido.test(numeroTelefono)) {
    return false;
  } else {
    return true;
  }
}

//FUNCIONES DE LIBRO
function altaLibro(
  isbnLibro,
  autorLibro,
  tituloLibro,
  editorialLibro,
  numeroEjemplares
) {
  let codLibro =
    parseInt(listaLibros[listaLibros.length - 1].codLibro) +
    1; /*Convierto el código de libro del último índice del array en un entero 
    para poder sumarle 1 de forma que el código de libro sea el siguiente al último*/

  let isbn = isbnLibro;
  let autor = autorLibro;
  let titulo = tituloLibro;
  let editorial = editorialLibro;
  let ejemplares = parseInt(numeroEjemplares); //Convierto el número de ejemplares en un entero

  codLibro =
    codLibro.toString(); /*Convierto de nuevo el código de libro en una cadena de texto para que cumpla con los requisitos del enunciado*/

  // Verifico que ninguno de los datos esté vacio
  if (
    isbn != "" &&
    autor != "" &&
    titulo != "" &&
    editorial != "" &&
    ejemplares != ""
  ) {
    ejemplares = parseInt(ejemplares); // Convierto el número de ejemplares a entero
    // Verifico el formato de cada dato
    if (
      verificarISBN(isbn) &&
      verificarNombreApellidoAutorEditorial(autor) &&
      verificarNombreApellidoAutorEditorial(titulo) &&
      verificarNombreApellidoAutorEditorial(editorial) &&
      verificarEjemplares(ejemplares)
    ) {
      // Compruebo si el libro ya existe
      for (let libro in listaLibros) {
        if (listaLibros[libro].isbn == isbn) {
          alert("El libro con este ISBN ya existe");
        } else {
          listaLibros.push(
            new Libro(codLibro, isbn, autor, titulo, editorial, ejemplares)
          );
          alert("Libro añadido correctamente");
        }
      }
    } else {
      alert("Algún dato tiene un formato incorrecto");
    }
  } else {
    alert("Faltan datos por introducir");
  }
}

function bajaLibro() {
  codigoLibro = prompt("Introduce el codigo del libro:");
  let codigoLibroString = codigoLibro.toString();
  let estadoBaja = false;
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibroString) {
      listaLibros[libro].bajaLibro = true;
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, "0"); //padStart indica la longitud que debe tener y en caso de ser menor, añade un 0 a la izquierda
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); //en javascript los meses empiezan en 0, por eso le sumo 1
      const anyo = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anyo}`;
      listaLibros[libro].fechaBaja = fechaFormateada;
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    console.log("Libro dado de baja correctamente");
    console.table(listaLectores);
  } else {
    console.log(
      "El código de libro introducido no coincide con el de ningún libro"
    );
  }
}

function modifLibro(codigoLibro) {
  // Compruebo si el codLibro existe en la lista de libros
  let existeLibro = false;
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibro) {
      existeLibro = true;
      break;
    }
  }

  if (!existeLibro) {
    alert("El código de libro no existe.");
    return; // Salgo de la función si no existe el codLibro
  }

  let datoAModificar = prompt("Introduce el dato a modificar");

  switch (datoAModificar) {
    case "codLibro":
      let codLibro = prompt("Introduce el nuevo código de libro:");

      // Compruebo si el codLibro ya existe
      let existe = false;
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codLibro) {
          existe = true;
          break;
        }
      }
      if (existe) {
        alert("El código de libro ya existe");
      } else {
        // Si no existe, cambio el codLibro del libro correspondiente
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].codLibro = codLibro;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      }
      break;

    case "isbn":
      let isbn = prompt("Introduce el nuevo isbn:");
      if (verificarISBN(isbn)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].isbn = isbn;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del ISBN no es valido");
      }
      break;

    case "autor":
      let autor = prompt("Introduce el nuevo autor:");
      if (verificarNombreApellidoAutorEditorial(autor)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].autor = autor;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del autor no es valido");
      }
      break;

    case "titulo":
      let titulo = prompt("Introduce el nuevo título:");
      if (verificarTitulo(titulo)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].titulo = titulo;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato del título no es válido");
      }
      break;

    case "editorial":
      let editorial = prompt("Introduce la nueva editorial:");
      if (verificarNombreApellidoAutorEditorial(editorial)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].editorial = editorial;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log("El formato de la editorial no es válido");
      }
      break;

    case "ejemplares":
      let ejemplares = prompt("Introduce el nuevo número de ejemplares:");
      ejemplares = parseInt(ejemplares);

      // Validación para el número de ejemplares
      if (verificarEjemplares(ejemplares)) {
        for (let libro in listaLibros) {
          if (listaLibros[libro].codLibro == codigoLibro) {
            listaLibros[libro].ejemplares = ejemplares;
            console.log("Libro modificado correctamente");
            break; // Salgo del bucle después de hacer el cambio
          }
        }
      } else {
        console.log(
          "El número de ejemplares debe ser mayor o igual a 0 y menor o igual a 9."
        );
      }
      break;

    default:
      console.log("Dato no válido.");
      return;
  }

  listaLibros.sort((a, b) => a.codLibro - b.codLibro); // Ordeno la lista de libros por código
}

function hayLibro(codLibroOIsbn) {
  for (let libro of listaLibros) {
    if (
      (libro.codLibro === codLibroOIsbn || libro.isbn === codLibroOIsbn) &&
      !libro.bajaLibro
    ) {
      return true; // Si encuentro el libro (bien sea por el Código del libro o por el ISBN) y no está dado de baja, devuelvo true
    }
  }
  return false; // Si no encuentro el libro o está dado de baja, devuelvo false
}

function prestamoLibro(codigoLibro) {
  let prestado = false;

  // Recorro la lista de libros para buscar el libro con el código proporcionado
  for (let libro in listaLibros) {
    if (libro.codLibro == codigoLibro) {
      if (libro.ejemplares > 0) {
        // Si hay ejemplares disponibles, hago el préstamo
        libro.estado = "Prestado"; // Cambio el estado del libro
        libro.ejemplares = parseInt(libro.ejemplares) - 1; // Resto 1 al número de ejemplares
        libro.ejemplares = libro.ejemplares.toString(); // Aseguro que el valor vuelva a ser cadena de texto

        prestado = true; // Indico que el préstamo fue exitoso
        break; // Salgo del bucle porque ya se ha procesado el préstamo
      } else {
        alert(
          "No hay suficientes ejemplares disponibles para realizar el préstamo"
        );
        break; // Salgo del bucle si no hay ejemplares disponibles
      }
    }
  }

  // Si no se encontró el libro, se devuelve false
  if (!prestado) {
    alert("El libro con el código proporcionado no existe.");
  }

  return prestado; // Devuelvo true si se prestó el libro, o false en caso contrario
}

function devolucionLibro(codigoIsbn) {
  let prestado = true;
  for (let libro in listaLibros) {
    if (listaLibros[libro].isbn == codigoIsbn) {
      if (listaLibros[libro].ejemplares > 0) {
        prestado = false;

        if (!prestado) {
          //Lo convierto en un entero para poder sumarle 1
          listaLibros[libro].ejemplares =
            parseInt(listaLibros[libro].ejemplares) + 1;

          //Vuelvo a convertirlo en cadena para que no haya problemas al volver a llamar a la funcion
          listaLibros[libro].ejemplares =
            listaLibros[libro].ejemplares.toString();
        }
      }
    }
  }
  return prestado;
}

//FUNCIONES PRESTAMO

function solicitudPrestamo(codLibro, numSocio) {
  prestamoLibro(codLibro);
  if (prestamoLibro()) {
    numeroPrestamo = 1;
    if (
      listadoTotalPrestamos[listadoTotalPrestamos.length - 1].numeroPrestamo >=
      1
    ) {
      numeroPrestamo = numeroPrestamo + 1;
    }

    listadoTotalPrestamos.push(
      new Prestamo(numeroPrestamo, numSocio, codLibro)
    );
  }
}
function devolucionPrestamos(codigoIsbn, numPrestamo) {
  devolucionLibro(codigoIsbn);
  if (!devolucionLibro()) {
    for (let prestamo in listadoTotalPrestamos) {
      if (listadoTotalPrestamos[prestamo].numPrestamo == numPrestamo) {
        listadoTotalPrestamos[prestamo].fechaDevolucion = new Date();
      }
    }
    for (let prestamo in listadoPrestamosVivos) {
      listadoPrestamosVivos.splice(listadoPrestamosVivos.indexOf(prestamo), 1);
    }
  }
}

//VERIFICACIONES
function verificarNombreApellidoAutorEditorial(texto) {
  const datoValido = /^[a-zA-ZáéíóúÁÉÍÓÚ]+(-[a-zA-ZáéíóúÁÉÍÓÚ]+)?$/; //Compruebo que este compuesta por una o dos palabras separadas
  // por un guion, que esta compuesto por cualquier letra (tanto Mayúsculas como Minúsculas) y que las vocales puedan tener acentos
  return datoValido.test(texto); //Devuelvo el resultado de comprobar si el texto que se le da a la funcion cumple los requisitos de nombreApellidoValido
}

function verificarISBN(texto) {
  const isbnValido = /^\d{13}$/; // Debe contener exactamente 13 dígitos
  return isbnValido.test(texto); //Devuelvo el resultado de comprobar si el texto que se le da a la funcion cumple los requisitos de verificarISBN
}

function verificarTitulo(texto) {
  const tituloValido = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s\-_¡!@#$%&/()¿?€.,:;]+$/; // Compruebo que el título está compuesto por letras (mayúsculas y minúsculas),
  // números y los caracteres imprimibles permitidos y espacios (\s)
  return tituloValido.test(titulo);
}

function verificarEjemplares(ejemplares) {
  const ejemplaresValido = /^[0-9]$/; // Valores posibles del 0 al 9
  return ejemplaresValido.test(ejemplares.toString()); //Devuelve si es valido el valor en formato texto
}

//INTERACCIONES CON EL DOM:
//Al hacer click sobre el botón Actualizar libros, se mostrará en la vista (una tabla con id vista-libros-tabla)
// los libros que hay en la biblioteca (Es decir el array de listaLibros)
document
  .getElementById("vista-libros-boton")
  .addEventListener("click", function () {
    document.getElementById("vista-libros").querySelector("tbody").innerHTML =
      "";
    for (let libro in listaLibros) {
      document
        .getElementById("vista-libros")
        .querySelector("tbody").innerHTML += `
      <tr>
        <td>${listaLibros[libro].codLibro}</td>
        <td>${listaLibros[libro].isbn}</td>
        <td>${listaLibros[libro].autor}</td>
        <td>${listaLibros[libro].titulo}</td>
        <td>${listaLibros[libro].editorial}</td>
        <td>${listaLibros[libro].ejemplares}</td>
      </tr>`;
    }
  });

//Al hacer click sobre el botón Actualizar lectores, se mostrará en la vista los lectores que hay en la
// biblioteca (Es decir el array de listaLectores)
document
  .getElementById("comprobar-lectores-boton")
  .addEventListener("click", function () {
    document
      .getElementById("comprobar-lectores-tabla")
      .querySelector("tbody").innerHTML = "";
    for (let lector in listaLectores) {
      document
        .getElementById("comprobar-lectores-tabla")
        .querySelector("tbody").innerHTML += `
      <tr>
        <td>${listaLectores[lector].numSocio}</td>
        <td>${listaLectores[lector].nombre}</td>
        <td>${listaLectores[lector].apellido}</td>
        <td>${listaLectores[lector].telefono}</td>
        <td>${listaLectores[lector].email}</td>
      </tr>`;
    }
  });
