// Recibir Fichero de Libros
document
  .getElementById("importar-input-libros")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Archivo seleccionado por el usuario
    const reader = new FileReader(); // Lector de archivos

    reader.onload = function (e) {
      const text = e.target.result; // Contenido del archivo
      processCSV(text, "libros"); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
  });

// Recibir Fichero de Lectores
document
  .getElementById("importar-input-lectores")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Archivo seleccionado por el usuario
    const reader = new FileReader(); // Lector de archivos

    reader.onload = function (e) {
      const text = e.target.result; // Contenido del archivo
      processCSV(text, "lectores"); // Procesar el contenido del archivo
    };

    reader.readAsText(file); // Leer el archivo como texto
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
    console.log(listaLectores);
  } else if (tipoFichero === "libros") {
    for (let celda of fichero) {
      listaLibros.push(
        new Libro(celda[0], celda[1], celda[2], celda[3], celda[4], celda[5])
      );
    }
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
  let numSocio = prompt("Introduce el número de socio:");
  let nombre = prompt("Introduce el nombre:");
  let apellido = prompt("Introduce el apellido:");
  let telefono = prompt("Introduce el teléfono:");
  let email = prompt("Introduce el email:");

  if (
    numSocio != "" &&
    nombre != "" &&
    apellido != "" &&
    telefono != "" &&
    email != ""
  ) {
    if (
      comprobarEmail(email, nombre, apellido) &&
      comprobarTelefono(telefono, nombre, apellido)
    ) {
      listaLectores.push(
        new Lector(numSocio, nombre, apellido, telefono, email)
      );
      alert("Lector añadido correctamente");
    } else {
      alert(
        "No se ha podido añadir el lector debido a que el email o el teléfono no son válidos"
      );
    }
  }
}

function bajaLector(numeroSocio) {
  let numeroSocioString = numeroSocio.toString();
  let estadoBaja = false;
  for (let lector in listaLectores) {
    if (listaLectores[lector].numSocio == numeroSocioString) {
      listaLectores[lector].bajaLector = true;
      listaLectores[lector].fechaBaja = new Date();
      estadoBaja = true;
      break;
    }
  }
  if (estadoBaja == true) {
    alert("Lector dado de baja correctamente");
  } else {
    alert("El número de socio introducido no coincide con el de ningún lector");
  }
}

// Función para comprobar el email
function comprobarEmail(emailLector, nombreLector, apellidoLector) {
  const dominios = listaDominiosValidos.join("|");
  const emailValido = new RegExp(
    `^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.(${dominios}))+$`
  );

  if (!emailValido.test(emailLector)) {
    /*Compruebo si el lector existe para añadirlo a la lista de correos invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
    devuelvo false pero sin añadirlo a la lista de no validos*/

    for (let lector in listaLectores) {
      if (
        listaLectores[lector].nombre == nombreLector &&
        listaLectores[lector].apellido == apellidoLector &&
        listaLectores[lector].email == emailLector
      ) {
        listaCorreosInvalidos.push({
          nombreLector,
          apellidoLector,
          emailLector,
        });
      }
    }
    return false;
  }
  return true;
}

function comprobarEmailCreacion(emailLector, nombreLector, apellidoLector) {
  comprobarEmail(emailLector, nombreLector, apellidoLector);
  if (!comprobarEmail()) alert("Dirección de email inválida");
}

// Función para comprobar el teléfono
function comprobarTelefono(telefonoLector, nombreLector, apellidoLector) {
  const telefonoValido = /^[9|6|7][0-9]{8}$/; // Comienza por 9, 6 o 7 y tiene 8 dígitos despues del primero

  if (!telefonoValido.test(telefonoLector)) {
    alert("Número de teléfono inválido");

    /*Compruebo si el lector existe para añadirlo a la lista de telefonos invalidos, si no existe 
    (es decir que se esta llamando a la función a la hora de dar de alta un nuevo lector) 
    devuelvo false pero sin añadirlo a la lista de no validos*/

    for (let lector in listaLectores) {
      if (
        listaLectores[lector].nombre == nombreLector &&
        listaLectores[lector].apellido == apellidoLector &&
        listaLectores[lector].telefono == telefonoLector
      ) {
        listaTelefonosInvalidos.push({
          nombreLector,
          apellidoLector,
          telefonoLector,
        });
      }
    }
    return false;
  }
  return true;
}

function modifLector(numeroSocio) {
  let datoAModificar = prompt("Introduce el dato a modificar");
  switch (datoAModificar) {
    case "numSocio":
      let numSocio = prompt("Introduce el nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          for (let lector in listaLectores) {
            if (listaLectores[lector].numSocio == numeroSocio) {
              alert("El número de socio ya existe");
            } else {
              listaLectores[lector].numSocio = numSocio;
            }
          }
        }
      }
      break;
    case "nombre":
      let nombre = prompt("Introduce el nombre:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].nombre = nombre;
        }
      }
      break;
    case "apellido":
      let apellido = prompt("Introduce el apellido:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].apellido = apellido;
        }
      }
      break;
    case "telefono":
      let telefono = prompt("Introduce el telefono:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].telefono = telefono;
        }
      }
      break;
    case "email":
      let email = prompt("Introduce el email:");
      for (let lector in listaLectores) {
        if (listaLectores[lector].numSocio == numeroSocio) {
          listaLectores[lector].email = email;
        }
      }
      break;
  }
  alert("Lector modificado correctamente");
}

//Funciones de Libro
function altaLibro() {
  let codLibro = prompt("Introduce el codigo del libro:");
  let isbn = prompt("Introduce el isbn:");
  let autor = prompt("Introduce el autor:");
  let titulo = prompt("Introduce el titulo:");
  let editorial = prompt("Introduce la editorial:");
  let ejemplares = prompt("Introduce los ejemplares:");

  if (
    codLibro != "" &&
    isbn != "" &&
    autor != "" &&
    titulo != "" &&
    editorial != "" &&
    ejemplares != ""
  ) {
    listaLibros.push(
      new Libro(codLibro, isbn, autor, titulo, editorial, ejemplares)
    );
    alert("Libro añadido correctamente");
  }
}

function bajaLibro(codigoLibro) {
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibro) {
      listaLibros[libro].bajaLibro = true;
      listaLibros[libro].fechaBaja = new Date();
    } else {
      alert(
        "El código de libro introducido no coincide con el de ningún libro"
      );
    }
  }
}

function modifLibro(codigoLibro) {
  let datoAModificar = prompt("Introduce el dato a modificar");
  switch (datoAModificar) {
    case "codLibro":
      let codLibro = prompt("Introduce el codigo de libro:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          for (let libro in listaLibros) {
            if (listaLibros[libro].codLibro == codigoLibro) {
              alert("El código de libro ya existe");
            } else {
              listaLibros[libro].codLibro = codLibro;
            }
          }
        }
      }
      break;
    case "isbn":
      let isbn = prompt("Introduce el isbn:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].isbn = isbn;
        }
      }
      break;
    case "autor":
      let autor = prompt("Introduce el autor:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].autor = autor;
        }
      }
      break;
    case "titulo":
      let titulo = prompt("Introduce el titulo:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].titulo = titulo;
        }
      }
      break;
    case "editorial":
      let editorial = prompt("Introduce el editorial:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].editorial = editorial;
        }
      }
      break;

    case "ejemplares":
      let ejemplares = prompt("Introduce el ejemplares:");
      for (let libro in listaLibros) {
        if (listaLibros[libro].codLibro == codigoLibro) {
          listaLibros[libro].ejemplares = ejemplares;
        }
      }
      break;
  }
  alert("Libro modificado correctamente");
}

function hayLibro(codigoIsbn, nombreAutor, tituloLibro) {
  for (let libro in listaLibros) {
    if (
      listaLibros[libro].isbn == codigoIsbn &&
      listaLibros[libro].autor == nombreAutor &&
      listaLibros[libro].titulo == tituloLibro
    ) {
      return listaLibros[libro];
    } else return Error;
  }
}

function prestamoLibro(codigoLibro) {
  let prestado = false;
  for (let libro in listaLibros) {
    if (listaLibros[libro].codLibro == codigoLibro) {
      if (listaLibros[libro].ejemplares > 0) {
        listaLibros[libro].estado = "Prestado";
        prestado = true;

        if (prestado) {
          //Lo convierto en un entero para poder restarle 1
          listaLibros[libro].ejemplares =
            parseInt(listaLibros[libro].ejemplares) - 1;

          //Vuelvo a convertirlo en cadena para que no haya problemas al volver a llamar a la funcion
          listaLibros[libro].ejemplares =
            listaLibros[libro].ejemplares.toString();
        }
      } else {
        alert(
          "No hay suficientes ejemplares disponibles para realizar el prestamo"
        );
      }
    }
  }
  return prestado;
}

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
